from fastapi import APIRouter
from board import get_piece_coordinates, raw_move_to_san, is_move_legal
from dbconnect import get_puzzle_set, get_puzzle
from chesscom import generate_player_puzzles as chesscom_generate

router = APIRouter(prefix="/chess")

@router.get("/utils/fen-to-pieces-coords")
async def get_coords_from(fen: str):
    return get_piece_coordinates(fen)


@router.get("/utils/move-indices-to-san")
async def convert_indices_to_san(fen: str, origin: int, target: int):
    back_origin = convert_array_index_to_pychess_square(origin)
    back_target = convert_array_index_to_pychess_square(target)
    return {"san": raw_move_to_san(fen, back_origin, back_target)}


@router.get("/utils/is-move-legal")
async def get_move_legality(fen: str, origin: int, target: int):
    back_origin = convert_array_index_to_pychess_square(origin)
    back_target = convert_array_index_to_pychess_square(target)
    return {"legal": is_move_legal(fen, back_origin, back_target)}


@router.get("/puzzles/{puzzle_id}")
async def get_puzzle_from_db(puzzle_id: str):
    puzzle = await get_puzzle(puzzle_id)
    return puzzle


@router.get("/puzzlesets/{puzzleset_id}")
async def get_puzzleset_from_db(puzzleset_id: str):
    puzzleset = await get_puzzle_set(puzzleset_id)
    return puzzleset


@router.get("/puzzles/create_puzzles_from_profile")
async def create_puzzles_from_profile(profile_name: str, 
                                      site: str,
                                      number_of_puzzles: int):
    if site == "chesscom":
        generated = chesscom_generate(profile_name, number_of_puzzles)
        return {"puzzles": generated}
    return {"message": "siteNotRecognized"}

def convert_array_index_to_pychess_square(array_index: int):
    return (7 - array_index // 8)*8 + (array_index % 8)