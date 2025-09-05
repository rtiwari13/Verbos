from fastapi import HTTPException, status , Request
from app.users.utils import decode_jwt_token

def get_user_id(request: Request):
    token = request.cookies.get("access_token")  #  token in cookies
    if token is None:
        raise HTTPException(status_code=401, detail="Token is missing")
    
    try:
        payload = decode_jwt_token(token)
        return payload["user_id"]  
    
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token",
        )
    
    