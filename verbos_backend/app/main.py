from fastapi import FastAPI
from app.users.router import auth_router, user_router
from app.notebook.router import notebook_page_router, notebook_router

app = FastAPI()

@app.get("/")
async def root():
    return{"message":"verbose backend is working"}

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(notebook_router)
app.include_router(notebook_page_router)