from django.urls import path
from . import views
from django.views.generic import RedirectView

urlpatterns = [
        path('index/', views.index, name='index'),
        path('login/',views.Login,name='login'),
        path('register/',views.Register,name='register'),
        path('', views.index, name='home'),
        path('logout/', views.Logout, name='logout'),
        path('profile/', views.profile, name='profile'),
        path('update_profile/', views.update_profile, name='update_profile'),
        path('get_profile/', views.get_profile, name='get_profile'),
]