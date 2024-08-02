from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login,logout,update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import UserProfileForm, UserProfileExtraForm, CustomPasswordChangeForm
from .models import UserProfile



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
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = UserProfileForm(instance=request.user)

    return render(request, 'profile.html', {'form': form})

@login_required
def update_profile(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)

    if request.method == 'POST':
        user_form = UserProfileForm(request.POST, instance=user)
        profile_form = UserProfileExtraForm(request.POST, instance=profile)
        password_form = CustomPasswordChangeForm(user, request.POST)

        
        if user_form.is_valid():
            user_form.save()
        else:
            messages.error(request, 'Error in user details form.')

        
        if profile_form.is_valid():
            profile_form.save()
            messages.success(request, 'Profile details updated successfully!')
            print("Phone number saved:", profile_form.cleaned_data.get('phone')) 
        else:
            messages.error(request, 'Error in profile details form.')

        
        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)  #
            messages.success(request, 'Password updated successfully!')
        else:
            messages.error(request, 'Error in password form.')

        return redirect('profile')

    else:
        user_form = UserProfileForm(instance=user)
        profile_form = UserProfileExtraForm(instance=profile)
        password_form = CustomPasswordChangeForm(user)

    return render(request, 'profile.html', {
        'user_form': user_form,
        'profile_form': profile_form,
        'password_form': password_form,
    })