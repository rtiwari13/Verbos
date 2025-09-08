from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.db.session import get_db
from app.middlewares.auth_middleware import get_user_id
from app.models import Document
from app.document.schemas import DocumentCreate, DocumentUpdate

doc_router = APIRouter(prefix="/document", tags=["Document"])


@doc_router.post("")
def create_document(
    document: DocumentCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):
    try:
        new_doc = Document(
            name=document.name, content=document.content, user_id=user_id
        )
        db.add(new_doc)
        db.commit()
        db.refresh(new_doc)

        return {
            "success": True,
            "message": "document created successfully",
            "document_created": new_doc,
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


@doc_router.get("")
def read_document(db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    try:

        all_documents: Document = (
            db.query(Document).filter(Document.user_id == user_id).all()
        )
        if not all_documents:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No documents found for this user.",
            )
        return all_documents

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


@doc_router.put("/{document_id}")
def update_document(
    document: DocumentUpdate,
    document_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_user_id),
):

    current_document: Document = (
        db.query(Document).filter(Document.id == document_id).first()
    )

    if current_document.user_id == user_id:
        current_document.name = document.name
        current_document.content = document.content

        db.commit()
        db.refresh(current_document)

        return {"success": True, "message": "document updated"}

    else:
        return {"success": False, "message": "document can not be updated"}


@doc_router.delete("/{document_id}")
def delete_document(
    document_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)
):

    try:

        current_document: Document = (
            db.query(Document).filter(Document.id == document_id).first()
        )

        if not current_document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Document with ID {document_id} not found.",
            )
        if current_document.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You do not have access to this document",
            )

        db.delete(current_document)
        db.commit()
        return {"success": True, "message": "document deleted successfully"}

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
