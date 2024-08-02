from django import forms
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from .models import UserProfile
from django.contrib.auth.models import User

class UserProfileForm(UserChangeForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email',]

class UserProfileExtraForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = [ 'address', 'company', 'linkedin', 'twitter']

class CustomPasswordChangeForm(PasswordChangeForm):
    class Meta:
        model = User
        fields = ['old_password', 'new_password1', 'new_password2']
