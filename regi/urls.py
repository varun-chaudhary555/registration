from django.urls import path
from . import views
from django.views.generic import RedirectView

urlpatterns = [
        path('index/', views.index, name='index'),
        path('login/',views.Login,name='login'),
        path('register/',views.Register,name='register'),
        path('', views.index, name='home'),
        path('profile/', views.profile, name='profile'),
        path('logout/', views.Logout, name='logout'),
        path('profile/update/', views.update_profile, name='update_profile'), 
 ]
