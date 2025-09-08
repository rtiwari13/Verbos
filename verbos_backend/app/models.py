from app.db.session import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
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
    updated_at = Column(DateTime, default=datetime.now)

    notebooks = relationship("Notebook",back_populates="author",cascade="all, delete-orphan")



class Notebook(Base):

    __tablename__ = "notebooks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    # Foreign key (Many notebooks belong to one user)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    # Relationship back to User
    author = relationship("User", back_populates="notebooks")

    # Many pages belong to one notebook
    pages = relationship(
        "NotebookPage", back_populates="page_for_notebook", cascade="all, delete-orphan"
    )


class NotebookPage(Base):
    __tablename__ = "notebook_pages"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), index=True)

    content = Column(Text)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    # relation
    notebook_id = Column(Integer, ForeignKey("notebooks.id"))
    page_for_notebook = relationship("Notebook", back_populates="pages")



