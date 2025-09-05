from app.db.session import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime


class User(Base):

    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String, nullable=False, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
