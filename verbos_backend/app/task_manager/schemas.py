from pydantic import BaseModel
from enum import Enum
from typing import Optional,List

class StatusEnum(str, Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"


class CreateBoard(BaseModel): 
    name:str

class UpdateBoard(BaseModel): 
    name: str


class CreateTask(BaseModel): 
    name:str
    description:str
    board_id: int
    # due date

class UpdateTask(BaseModel): 
    name:str
    description:str
    board_id: int


class CreateCard(BaseModel): 
    name:str
    description:str
    status: Optional[StatusEnum] = StatusEnum.PENDING
    task_id : int
    tag_ids : List[int]

    
class UpdateCard(BaseModel): 
    name:str
    description:str
    status: Optional[StatusEnum] = StatusEnum.PENDING
    tag_ids : List[int]

class CreateTag(BaseModel): 
    name:str
    color:str

class UpdateTag(BaseModel): 
    name:str
    color:str
