from fastapi import APIRouter

router = APIRouter()

@router.get("/utils/is_move_legal")
def is_move_legal(fen: str, origin: int, target: int):
    return