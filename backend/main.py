from fastapi import FastAPI
from routers import chess

app = FastAPI()

app.include_router(chess.router)

@app.get("/index")
async def display_hello():
    return "Hello"