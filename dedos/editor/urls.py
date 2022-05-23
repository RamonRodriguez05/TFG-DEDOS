from django.urls import path
from django.conf.urls import *
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.view_login, name='view_login'),
    path('logout', views.view_logout, name='view_logout'),
    path('requestpassword', views.view_request_password, name='view_request_password'),
    path('register', views.view_register, name='view_register'),
    path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',  views.activate, name="activate_user"),
    path(r'^resetpassword/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',  views.password_reset, name="password_reset"),
    path(r'^changepassword/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',  views.password_change, name="password_change"),
    path('main', views.main, name='main'),
    # Dashboard stuff
    path('profile', views.user_profile, name='user_profile'),
    path('update_profile', views.update_profile, name='update_profile'),
    path('change_password', views.change_password, name='change_password'),
    path('add_group', views.add_group, name='add_group'),
    path('add_user', views.add_user, name='add_user'),
    path('editor', views.editor, name='editor'),
    path('proyectos', views.proyectos, name='proyectos'),
    path('insert/',views.insert, name='insert'),
    path('delete/<int:id>', views.delete),  
    path('edit/<int:id>', views.delete),  
]
