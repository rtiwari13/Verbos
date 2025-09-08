from fastapi import APIRouter, Depends, HTTPException, status
from app.notebook.schemas import (
    NotebookCreate,
    NotebookUpdate,
    NotebookPageCreate,
    NotebookPageUpdate,
)
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.db.session import get_db
from app.models import Notebook, NotebookPage
from app.middlewares.auth_middleware import get_user_id


notebook_router = APIRouter(prefix="/notebook", tags=["Notebook"])
notebook_page_router = APIRouter(
    prefix="/notebook/{notebook_id}/page", tags=["NotebookPage"]
)


@notebook_router.post("")
def create_notebook(
    notebook: NotebookCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        new_notebook = Notebook(name=notebook.name, user_id=user_id)
        db.add(new_notebook)
        db.commit()
        db.refresh(new_notebook)

        return {
            "success": True,
            "message": "notebook created successfully",
            "notebook_created": new_notebook,
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


@notebook_router.get("")
def view_notebook(db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    try:
        all_notebooks: Notebook = (
            db.query(Notebook).filter(Notebook.user_id == user_id).all()
        )
        if not all_notebooks:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No notebooks found for this user.",
            )
        return all_notebooks

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


@notebook_router.put("/{notebook_id}")
def update_notebook(
    notebook: NotebookUpdate,
    notebook_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )

        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )

        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You do not have access to this notebook.",
            )

        # Update notebook name : prevent empty names
        if not notebook.name or notebook.name.strip() == "":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Notebook name cannot be empty.",
            )

        current_notebook.name = notebook.name

        db.commit()
        db.refresh(current_notebook)

        return {"success": True, "message": "notebook updated successfully"}

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


@notebook_router.delete("/{notebook_id}")
def delete_notebook(
    notebook_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )
        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )

        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You do not have access to this notebook.",
            )

        db.delete(current_notebook)
        db.commit()
        return {"success": True, "message": "notebook deleted successfully"}

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


@notebook_page_router.post("")
def create_notebook_page(
    page: NotebookPageCreate,
    notebook_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )

        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )

        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You cannot create pages in this notebook.",
            )

        # Validate page name
        if not page.name or page.name.strip() == "":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Page name cannot be empty.",
            )

        new_page = NotebookPage(
            name=page.name, content=page.content, notebook_id=notebook_id
        )

        db.add(new_page)
        db.commit()
        db.refresh(new_page)

        return {"success": True, "message": "notebook page created"}

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


@notebook_page_router.get("")
def view_notebook_page(
    notebook_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )

        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )
        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You cannot view pages of this notebook.",
            )

        all_pages: NotebookPage = (
            db.query(NotebookPage).filter(NotebookPage.notebook_id == notebook_id).all()
        )
        if not all_pages:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No pages found for this notebook.",
            )
        return {
            "success": True,
            "message": "notebook pages retrived successfully",
            "all_pages": all_pages,
        }

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


@notebook_page_router.put("/{notebook_page_id}")
def update_notebook_page(
    updated_notebook_page: NotebookPageUpdate,
    notebook_id: int,
    notebook_page_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )

        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )

        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You cannot update pages of this notebook.",
            )

        current_notebook_page = (
            db.query(NotebookPage).filter(NotebookPage.id == notebook_page_id).first()
        )

        if not current_notebook_page:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook page with ID {notebook_page_id} not found.",
            )

        if not updated_notebook_page.name or updated_notebook_page.name.strip() == "":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Notebook page name cannot be empty.",
            )

        current_notebook_page.name = updated_notebook_page.name
        current_notebook_page.content = updated_notebook_page.content

        db.commit()
        db.refresh(current_notebook_page)

        return {"success": True, "message": "notebook page updated"}

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


@notebook_page_router.delete("/{notebook_page_id}")
def delete_notebook_page(
    notebook_id: int,
    notebook_page_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        current_notebook: Notebook = (
            db.query(Notebook).filter(Notebook.id == notebook_id).first()
        )

        if not current_notebook:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook with ID {notebook_id} not found.",
            )

        if current_notebook.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You cannot delete pages from this notebook.",
            )

        current_notebook_page: NotebookPage = (
            db.query(NotebookPage).filter(NotebookPage.id == notebook_page_id).first()
        )

        if not current_notebook_page:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notebook page with ID {notebook_page_id} not found.",
            )

        db.delete(current_notebook_page)
        db.commit()

        return {"success": True, "message": "notebook page deleted successfully"}

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
