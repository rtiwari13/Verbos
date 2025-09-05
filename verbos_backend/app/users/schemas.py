from pydantic import BaseModel

class UserCreate(BaseModel):
    username:str
    password:str
    email:str
    first_name:str
    last_name:str

class LoginRequest(BaseModel):
    username:str
    password:str

class TokenResponse(BaseModel):
    access_token:str
    