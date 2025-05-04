from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterUserView,LogoutUserView,DeleteUserAccountView

urlpatterns = [
    # POST
    path('register/',RegisterUserView.as_view(),name='register_user'),
    path('login/',TokenObtainPairView.as_view(),name='login_user'),
    path('logout/',LogoutUserView.as_view(),name='logout_user'),
    path('refresh_token/',TokenRefreshView.as_view(),name='refresh_token'),
    # path('change_password/',),
    # path('reset_password/',),
    # path('confirm_new_pswd/',)

    # GET

    # path('me/')   # get user profile

    # # PUT
    # path('update/profile/') # Update profile (name, avatar, bio)


    # DELETE
    path ('delete/account/', DeleteUserAccountView.as_view(),name='delete_user_account')

]