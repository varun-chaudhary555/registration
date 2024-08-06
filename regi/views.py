from django.shortcuts import render, redirect,HttpResponse,get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.contrib.auth import authenticate, login,logout,update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import UserProfileForm
from .models import UserProfile
import json



def index(request):
    return render(request, 'index.html')

def Login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome, {user.username}!')
            return redirect('profile') 
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request,'login.html')

def Logout(request):
    logout(request)
    return redirect('home')

def Register(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if not name:
            messages.error(request, "Username is required.")
        elif not email:
            messages.error(request, "Email is required.")
        elif password1 != password2:
            messages.error(request, "Passwords do not match.")
        elif User.objects.filter(username=name).exists():
            messages.error(request, "Username already exists.")
        elif User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
        else:
            user = User.objects.create_user(username=name, email=email, password=password1)  # Use create_user for hashed password
            messages.success(request, f'Account created for {name}!')
            return redirect('login')

    return render(request, 'register.html')


@login_required
def profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=user_profile)
        if form.is_valid():
            form.save()
            request.user.email = request.POST.get('email')  # update user's email separately
            request.user.save()
            messages.success(request, 'Profile updated successfully.')
            return redirect('profile')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = UserProfileForm(instance=user_profile)

    return render(request, 'profile.html', {'form': form, 'email': request.user.email})

@csrf_exempt
@login_required
def update_profile(request):
    try:
        data = json.loads(request.body)
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        user_profile.full_name = data.get('full_name', '')
        user_profile.phone = data.get('phone', '')
        user_profile.address = data.get('address', '')
        user_profile.company = data.get('company', '')
        user_profile.date_of_joining = data.get('date_of_joining', '')
        user_profile.occupation = data.get('occupation', '')
        user_profile.website = data.get('website', '')
        user_profile.save()
        
        updated_profile = {
            'full_name': user_profile.full_name,
            'phone': user_profile.phone,
            'address': user_profile.address,
            'company': user_profile.company,
            'date_of_joining': user_profile.date_of_joining,
            'occupation': user_profile.occupation,
            'website': user_profile.website,
        }

        return JsonResponse({'success': True, 'updatedProfile': updated_profile})
    except Exception as e:
        print(e)  # Print exception for debugging
        return JsonResponse({'success': False})
@login_required
def get_profile(request):
    if request.method == 'GET':
        user = request.user
        user_profile = get_object_or_404(UserProfile, user=user)
        profile_data = {
            'name': user.username,
            'email': user.email,
            'phone': user_profile.phone,
            'address': user_profile.address,
            'occupation': user_profile.occupation,
            'company': user_profile.company,
            'website': user_profile.website,
            'date_of_joining': user_profile.date_of_joining.strftime('%Y-%m-%d') if user_profile.date_of_joining else '',
        }
        return JsonResponse(profile_data)
    else:
        return HttpResponse(status=405)