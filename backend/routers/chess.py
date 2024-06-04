from fastapi import APIRouter
from pydantic import BaseModel
from board import get_piece_coordinates, raw_move_to_san

router = APIRouter(prefix="/chess")

@router.get("/utils/fen-to-pieces-coords")
async def get_coords_from(fen: str):
    return get_piece_coordinates(fen)

class MoveRequest(BaseModel):
    fen: str
    origin: int
    target: int


@router.get("/utils/move-indices-to-san")
async def convert_indices_to_san(fen: str, origin: int, target: int):
    print(origin, target)
    return {"response": "null"}
    return raw_move_to_san(fen, origin, target)