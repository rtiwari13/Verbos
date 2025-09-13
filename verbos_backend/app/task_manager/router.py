from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app.db.session import get_db
from app.middlewares.auth_middleware import get_user_id
from app.models import Board, Task, Card, Tag
from app.task_manager.schemas import (
    CreateBoard,
    UpdateBoard,
    CreateTask,
    UpdateTask,
    CreateCard,
    UpdateCard,
    CreateTag,
    UpdateTag
)

board_router = APIRouter(prefix="/board", tags=["Board"])
task_router = APIRouter(prefix="/board/task", tags=["Task"])
card_router = APIRouter(prefix="/board/task/card", tags=["Card"])
tag_router = APIRouter(prefix="/board/task/card/tag", tags=["Tag"])


#  BOARD
@board_router.post("")
def create_board(
    board: CreateBoard,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        new_board = Board(name=board.name, user_id=user_id)
        db.add(new_board)
        db.commit()
        db.refresh(new_board)

        return {
            "success": True,
            "message": "board created successfully",
            "document_created": new_board,
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected error: {str(e)}",
        )


@board_router.get("")
def view_board(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        all_boards: Board = db.query(Board).filter(Board.user_id == user_id).all()

        if not all_boards:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No board found for this user.",
            )
        return all_boards

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected error: {str(e)}",
        )


@board_router.get("/{board_id}")
def view_board_tasks(
    board_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:

        current_board: Board = db.query(Board).filter(Board.id == board_id).first()

        if not current_board:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No board found for this user.",
            )

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        all_tasks: Task = db.query(Task).filter(Task.board_id == board_id).all()

        return {
            "success": True,
            "message": "tasks retrived successfully",
            "all_tasks": all_tasks,
        }

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@board_router.put("/{board_id}")
def update_board(
    board: UpdateBoard,
    board_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        current_board: Board = db.query(Board).filter(Board.id == board_id).first()

        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        current_board.name = board.name
        db.commit()
        db.refresh(current_board)
        return {"success": True, "message": "board updated"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@board_router.delete("/{board_id}")
def delete_board(
    board_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_board: Board = db.query(Board).filter(Board.id == board_id).first()

        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        db.delete(current_board)
        db.commit()
        return {"success": True, "message": "board deleted successfully"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# TASK
@task_router.post("")
def create_task(
    task: CreateTask, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_board: Board = db.query(Board).filter(Board.id == task.board_id).first()

        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        new_task = Task(
            name=task.name, description=task.description, board_id=task.board_id
        )

        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        return {
            "success": True,
            "message": "task created successfully",
            "task_created": new_task,
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@task_router.put("/{task_id}")
def update_task(
    task: UpdateTask,
    task_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:

        current_board: Board = db.query(Board).filter(Board.id == task.board_id).first()
        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        current_task = db.query(Task).filter(Task.id == task_id).first()
        if not current_task:
            raise HTTPException(status_code=404, detail="Task not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        current_task.name = task.name
        current_task.description = task.description

        db.commit()
        db.refresh(current_task)

        return {
            "success": True,
            "message": "task updated successfully",
            "task_updated": current_task,
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@task_router.delete("/{task_id}")
def delete_task(
    task_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:

        current_task = db.query(Task).filter(Task.id == task_id).first()
        if not current_task:
            raise HTTPException(status_code=404, detail="Task not found")

        current_board: Board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )
        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        db.delete(current_task)
        db.commit()

        return {"success": True, "message": "task deleted successfully"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@task_router.get("/{task_id}")
def view_all_card(
    task_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:

        current_task: Task = db.query(Task).filter(Task.id == task_id).first()
        if not current_task:
            raise HTTPException(status_code=404, detail="Task not found")

        current_board: Board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )
        current_board: Board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )
        if not current_board:
            raise HTTPException(status_code=404, detail="Board not found")

        if current_board.user_id != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized access")

        all_cards: Card = db.query(Card).filter(Card.task_id == task_id).all()

        return {
            "success": True,
            "message": "cards retrived successfully",
            "all_cards": all_cards,
        }

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


# CARD
@card_router.post("")
def create_card(
    card: CreateCard, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        # Ensure task exists
        current_task = db.query(Task).filter(Task.id == card.task_id).first()
        if not current_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
            )

        # Ensure board belongs to user
        current_board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )
        if not current_board or current_board.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to add a card to this task",
            )

        new_card = Card(
            name=card.name,
            description=card.description,
            status=card.status,
            task_id=card.task_id,
            # tag_ids = card.tag_ids
        )

        db.add(new_card)
        db.commit()
        db.refresh(new_card)

        return {
            "success": True,
            "message": "card created successfully",
            "card_created": new_card,
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@card_router.put("/{card_id}")
def update_card(
    card: UpdateCard,
    card_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:

        current_card: Card = db.query(Card).filter(Card.id == card_id).first()
        if not current_card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Card not found"
            )

        current_task: Task = (
            db.query(Task).filter(Task.id == current_card.task_id).first()
        )
        current_board: Board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )

        if current_board.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to update this card",
            )

        current_card.name = card.name
        current_card.description = card.description
        current_card.status = card.status
        # tag_ids = card.tag_ids

        db.commit()
        db.refresh(current_card)
        return {"success": True, "message": "card updated"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@card_router.delete("/{card_id}")
def delete_card(
    card_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_card: Card = db.query(Card).filter(Card.id == card_id).first()
        if not current_card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Card not found"
            )

        current_task: Task = (
            db.query(Task).filter(Task.id == current_card.task_id).first()
        )
        current_board: Board = (
            db.query(Board).filter(Board.id == current_task.board_id).first()
        )

        if current_board.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to delete this card",
            )

        db.delete(current_card)
        db.commit()
        return {"success": True, "message": "card deleted successfully"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


# TAG
@tag_router.post("")
def create_tag(
    tag: CreateTag, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):

    try:
        existing_tag = (
            db.query(Tag).filter(Tag.user_id == user_id, Tag.name == tag.name).first()
        )

        if existing_tag:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A tag with this name already exists",
            )

        new_tag = Tag(name=tag.name, color=tag.color, user_id=user_id)

        db.add(new_tag)
        db.commit()
        db.refresh(new_tag)

        return {
            "success": True,
            "message": "tag created successfully",
            "tag_created": new_tag,
        }

    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid data provided",
        )
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@tag_router.get("")
def view_all_tags(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        all_tags: Tag = db.query(Tag).filter(Tag.user_id == user_id).all()

        if not all_tags:
            return {
                "success": True,
                "message": "No tags found",
                "all_tags": [],
            }

        return {
            "success": True,
            "message": "tags retrived successfully",
            "all_tags": all_tags,
        }

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@tag_router.put("/{tag_id}")
def update_tag(
    tag: UpdateTag,
    tag_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):

    try:
        current_tag: Tag = db.query(Tag).filter(Tag.id == tag_id).first()

        if not current_tag:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tag not found",
            )

        if current_tag.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to update this tag",
            )

        # Check duplicate name
        duplicate_tag = (
            db.query(Tag)
            .filter(Tag.user_id == user_id, Tag.name == tag.name, Tag.id != tag_id)
            .first()
        )
        if duplicate_tag:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another tag with this name already exists",
            )

        current_tag.name = tag.name
        current_tag.color = tag.color
        db.commit()
        db.refresh(current_tag)

        return {"success": True, "message": "tag updated", "tag_updated": current_tag}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@tag_router.delete("/{tag_id}")
def delete_tag(
    tag_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_tag: Tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if not current_tag:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tag not found",
            )

        if current_tag.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to delete this tag",
            )

        db.delete(current_tag)
        db.commit()
        return {"success": True, "message": "tag deleted successfully"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )
