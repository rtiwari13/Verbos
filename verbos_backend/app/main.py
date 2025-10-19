from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.users.router import auth_router, user_router
from app.notebook.router import notebook_page_router, notebook_router
from app.document.router import doc_router
from app.task_manager.router import board_router , task_router , card_router , tag_router

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],              # allow all HTTP methods
    allow_headers=["*"],              # allow all headers
)

@app.get("/")
async def root():
    return{"message":"verbose backend is working"}

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(notebook_router)
app.include_router(notebook_page_router)
app.include_router(doc_router)
app.include_router(board_router)
app.include_router(task_router)
app.include_router(card_router)
app.include_router(tag_router)