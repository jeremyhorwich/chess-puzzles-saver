from fastapi import APIRouter
from board import get_piece_coordinates, raw_move_to_san, is_move_legal

router = APIRouter(prefix="/chess")

@router.get("/utils/fen-to-pieces-coords")
async def get_coords_from(fen: str):
    return get_piece_coordinates(fen)

@router.get("/utils/move-indices-to-san")
async def convert_indices_to_san(fen: str, origin: int, target: int):
    back_origin = convert_array_index_to_pychess_square(origin)
    back_target = convert_array_index_to_pychess_square(target)
    return raw_move_to_san(fen, back_origin, back_target)

@router.get("/utils/is-move-legal")
async def is_move_legal(fen: str, origin: int, target: int):
    back_origin = convert_array_index_to_pychess_square(origin)
    back_target = convert_array_index_to_pychess_square(target)
    return {"legal": is_move_legal(fen, back_origin, back_target)}

def convert_array_index_to_pychess_square(array_index: int):
    return (7 - array_index // 8)*8 + (array_index % 8)