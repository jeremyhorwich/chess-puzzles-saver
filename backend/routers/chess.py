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
    back_origin = (7 - origin // 8)*8 + (origin % 8)
    back_target = (7 - target // 8)*8 + (target % 8)
    return raw_move_to_san(fen, back_origin, back_target)