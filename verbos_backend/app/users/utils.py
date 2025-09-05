import bcrypt
import jwt
import os 
from dotenv import load_dotenv

load_dotenv()

jwt_secret = os.getenv("JWT_SECRET_KEY")
jwt_algo = os.getenv("JWT_ALGORITHM")


def hash_password(password):
    password_bytes = password.encode('utf-8')
    hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed_password.decode('utf-8')

def match_password(password,hashed_password):
    password_bytes = password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    
    if bcrypt.checkpw(password_bytes, hashed_password_bytes):
        return True
    else:
        return False
    
def create_jwt_token(payload):  
    access_token = jwt.encode(payload,jwt_secret, jwt_algo)
    return access_token

def decode_jwt_token(token):
    payload = jwt.decode(token,jwt_secret,jwt_algo)
    return payload