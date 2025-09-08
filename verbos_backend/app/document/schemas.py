from pydantic import BaseModel

class DocumentCreate(BaseModel):
    name: str
    content:str

class DocumentUpdate(BaseModel):
    name: str
    content:str