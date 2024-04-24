from puzzle import Puzzle
from board import Board
import fen

def read_boards_from(file: str):
    pass

if __name__ == "__main__": 
    fen_raw = input("Fen? ")
    usable_position_data = fen.load(fen_raw)
    new_board = Board(usable_position_data[0])
    print(new_board)