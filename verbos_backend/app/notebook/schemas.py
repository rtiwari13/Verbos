from pydantic import BaseModel

class NotebookCreate(BaseModel):  
    name:str

class NotebookUpdate(BaseModel):
    name:str

class NotebookPageCreate(BaseModel):
    name:str
    content:str

class NotebookPageUpdate(BaseModel): 
    name:str
    content:str
