import json
from chess import Move, Board

def algebraic_to_coord(algebraic_position: str) -> tuple[int, int]:
    column = ord(algebraic_position[0]) - 97
    row = 8 - int(algebraic_position[1])
    return row, column

#TODO: Format error handling
#TODO: Change to convert to algebraic notation, then in Board convert
#   to coordinates. We don't need to know coords outside of board
def get_piece_coordinates(raw: str) -> json:
    coordinates = dict()
    current_row = 0
    current_column = 0
    for char in raw:
        if char == "/":
            current_row += 1
            current_column = 0
            continue
        if char.isdigit():
            current_column += int(char)
            continue
        if char == " ":
            break
        coordinates[(current_row*8) + current_column] = char
        current_column += 1
    print(coordinates)
    return coordinates

def raw_move_to_san(fen: str, origin: int, target: int):
    board = Board(fen)
    move = Move(origin, target)
    print(board.san(move))
    return  {"san": board.san(move)}

def get_turn(raw: str) -> str:
    if raw == "w":
        return 0
    return 1

#Format of FEN:
#(1) Piece positions, (2) Whose move (3) Castling rights
#(4) En passant availability (5) Halfmoves (6) FullMoves

#Sample FEN (for reference):
#8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50

def fen_to_fields(fen: str) -> list:
    fields = fen.split()
    fields[0] = get_piece_coordinates(fields[0])
    fields[1] = get_turn(fields[1])
    return fields