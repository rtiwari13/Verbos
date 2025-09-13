from app.db.session import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Table , Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum


class StatusEnum(enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

card_tags_table = Table(
    'card_tags',Base.metadata,
    Column("card_id", Integer, ForeignKey("cards.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True)
)


class User(Base):

    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String, nullable=False, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now,onupdate=datetime.now)

    notebooks = relationship("Notebook",back_populates = "author", cascade = "all, delete-orphan")
    docs = relationship("Document" , back_populates = "doc_author", cascade = "all, delete-orphan")
    boards = relationship("Board" , back_populates = "board_user", cascade = "all, delete-orphan")
    tags = relationship("Tag",back_populates = "tag_user", cascade = "all, delete-orphan")
    
class Notebook(Base):

    __tablename__ = "notebooks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now,onupdate=datetime.now)

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
    updated_at = Column(DateTime, default=datetime.now,onupdate=datetime.now)

    # relation
    notebook_id = Column(Integer, ForeignKey("notebooks.id"))
    page_for_notebook = relationship("Notebook", back_populates="pages")


class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    doc_author = relationship("User", back_populates="docs")

# task manager

class Board(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    board_user = relationship("User",back_populates = "boards")

    board_tasks = relationship("Task", back_populates="task_board", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    due_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    board_id = Column(Integer, ForeignKey("boards.id"), nullable = False)

    task_board = relationship("Board",back_populates = "board_tasks" )
    task_cards = relationship("Card", back_populates = "card_task", cascade="all, delete-orphan")

# sub-task
class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)  
    name = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(Enum(StatusEnum, name="status_enum"), default=StatusEnum.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    task_id = Column(Integer, ForeignKey("tasks.id"),nullable=False)

    card_task = relationship("Task", back_populates="task_cards")
    card_tags = relationship("Tag",secondary=card_tags_table,back_populates="cards")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    color = Column(String(30))
    created_at = Column(DateTime, default=datetime.now)

    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
  
    tag_user = relationship("User", back_populates="tags")
    cards = relationship("Card",secondary=card_tags_table,back_populates="card_tags")

