from fastapi import APIRouter

router = APIRouter(prefix="/chess")

@router.get("/utils/is_move_legal")
async def is_move_legal(fen: str, origin: int, target: int):
    return

@router.get("/index")
async def show_hello():
    return "Hello World"