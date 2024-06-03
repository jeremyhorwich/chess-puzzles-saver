from fastapi import APIRouter
from board import get_piece_coordinates, raw_move_to_san

router = APIRouter(prefix="/chess")

@router.get("/utils/fen-to-pieces-coords")
async def get_coords_from(fen: str):
    return get_piece_coordinates(fen)

@router.get("/utils/move-indices-to-san")
async def convert_indices_to_san(fen: str, origin_square: int, target_square: int):
    return raw_move_to_san(fen, origin_square, target_square)