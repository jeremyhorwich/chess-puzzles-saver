from puzzle import Puzzle, save
from board import Board
import fen

def create_new_puzzleset():
    pass

def load_starting_menu():
    print("1. Load Set")
    print("2. Play Random Set")
    print("3. Create New Set")
    print("4. Import New Puzzles")
    print("\n\n\n\n\n")
    choice = input()
    match choice:
        case "4":
            load_import_puzzle_menu()

def load_import_puzzle_menu():
    print("1. Many (from file)") 
    print("2. One")
    print("\n\n\n\n\n\n\n")
    choice = input()
    match choice:
        case "2":
            create_new_puzzle()

def create_new_puzzle():
    fen = input("Fen? ")
    solution = input("Solution? ")
    explanation = input("Explanation? ")
    new_puzzle = Puzzle(fen, solution, explanation)
    tags_raw = input("\nTags? ")
    tags = tags_raw.split(", ")
    for tag in tags:
        save(new_puzzle, tag)


if __name__ == "__main__": 
    # fen_raw = input("Fen? ")

    # usable_position_data = fen.load(fen_raw)
    # new_board = Board(usable_position_data[0])
    # print()
    # print(new_board)
    load_starting_menu()