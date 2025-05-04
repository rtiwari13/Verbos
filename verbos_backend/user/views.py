
from .serializers import RegisterUserSerializer
from rest_framework import generics,permissions , status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.response import Response


User = get_user_model()


# register 
class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]


# login
# built in

# logout
class LogoutUserView(generics.GenericAPIView):
    permission_class = [permissions.IsAuthenticated]

    def post(self,request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {
                    "detail":"User is Logged Out "
                },
                status = status.HTTP_205_RESET_CONTENT
                )
        
        except Exception:
            return Response(
                {
                    "detail": "Invalid token"
                },
                status=status.HTTP_400_BAD_REQUEST
                )

# refresh_token ==> in built

# delete account
class DeleteUserAccountView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self,request):
        user = request.user
        user.delete()
        return Response(
            {
                "detail":"User Account is deleted ",

            },
            status=status.HTTP_204_NO_CONTENT
        )