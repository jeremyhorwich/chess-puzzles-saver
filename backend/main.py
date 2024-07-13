from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chessroutes
from routers import userroutes

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "https://chess-puzzles-saver-frontend.onrender.com",
    "https://chess-puzzles-saver.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chessroutes.router)
app.include_router(userroutes.router)

@app.get("/index")
async def display_hello():
    return {"message": "hello"}