from fastapi import APIRouter, Depends, Response, Cookie, HTTPException, status
from app.users.schemas import UserCreate, UserUpdate, LoginRequest
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.users.models import User
from app.users.utils import (
    hash_password,
    match_password,
    create_jwt_token,
    decode_jwt_token,
)
import datetime
from typing import Optional
from app.middlewares.auth_middleware import get_user_id

auth_router = APIRouter(prefix="/auth", tags=["Authentication"])
user_router = APIRouter(prefix="/user", tags=["UserProfile"])


# user registration
@auth_router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    try:
        new_user = User(
            username=user.username,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            password=hash_password(user.password),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        new_user.password = None

        return {"success": True, "message": "user successfully registered"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists",
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}",
        )


# user login
@auth_router.post("/login")
def login_user(response: Response, user: LoginRequest, db: Session = Depends(get_db)):
    try:
        user_data: User = db.query(User).filter(User.username == user.username).first()

        if user_data is None:
            return {"success": False, "message": "no user found"}
        if match_password(user.password, user_data.password) is False:
            return {"success": False, "message": "incorrect password"}

        user_data.password = None

        payload = {
            "user_id": user_data.user_id,
            "iat": datetime.datetime.now().timestamp(),
            "exp_at": (
                datetime.datetime.now() + datetime.timedelta(minutes=15)
            ).timestamp(),
        }
        access_token = create_jwt_token(payload)

        refresh_payload = {
            "user_id": user_data.user_id,
            "iat": datetime.datetime.now().timestamp(),
            "exp_at": (
                datetime.datetime.now() + datetime.timedelta(days=15)
            ).timestamp(),
        }

        refresh_token = create_jwt_token(refresh_payload)

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            expires=(
                datetime.datetime.now() + datetime.timedelta(minutes=15)
            ).timestamp(),
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            expires=(datetime.datetime.now() + datetime.timedelta(days=15)).timestamp(),
        )
        return {"success": True, "message": "logged in successfully"}

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}",
        )


@auth_router.get("/refresh")
def generate_access_from_refresh(
    response: Response, refresh_token: Optional[str] = Cookie(None)
):

    if refresh_token:
        payload = decode_jwt_token(refresh_token)

        access_payload = {
            "user_id": payload.get("user_id"),
            "iat": datetime.datetime.now().timestamp(),
            "exp_at": (
                datetime.datetime.now() + datetime.timedelta(minutes=15)
            ).timestamp(),
        }
        access_token = create_jwt_token(access_payload)

        refresh_payload = {
            "user_id": payload.get("user_id"),
            "iat": datetime.datetime.now().timestamp(),
            "exp_at": (
                datetime.datetime.now() + datetime.timedelta(days=15)
            ).timestamp(),
        }

        new_refresh_token = create_jwt_token(refresh_payload)

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            expires=(
                datetime.datetime.now() + datetime.timedelta(minutes=15)
            ).timestamp(),
        )
        response.set_cookie(
            key="refresh_token",
            value=new_refresh_token,
            httponly=True,
            secure=True,
            expires=(datetime.datetime.now() + datetime.timedelta(days=15)).timestamp(),
        )

        return "created access token successfully"

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found in cookies",
        )


@user_router.get("/profile")
def view_user_profile(
    user_id: str = Depends(get_user_id), db: Session = Depends(get_db)
):
    user_data: User = db.query(User).filter(User.user_id == user_id).first()

    if user_data is None:
        return {"success": False, "message": "no user found"}
    return user_data


@user_router.put("/update_profile")
def update_user_profile(user: UserUpdate,user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    user_data: User = db.query(User).filter(User.user_id == user_id).first()

    if user_data is None:
        return {"success": False, "message": "no user found"}
    
    user_data.username = user.username
    user_data.email= user.email
    user_data.first_name= user.first_name
    user_data.last_name = user.last_name
    
    db.commit()
    db.refresh(user_data) 
    user_data.password = None

    return {"success":True, "message":" Your profile is updated successfully", "user":user_data}


@user_router.delete("/delete_profile")
def delete_user_profile(
    user_id: str = Depends(get_user_id), db: Session = Depends(get_db)
):
    try:
        user_data = db.query(User).filter(User.user_id == user_id).first()

        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        db.delete(user_data)
        db.commit()

        return {"success": True, "message": "User deleted successfully"}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}",
        )
