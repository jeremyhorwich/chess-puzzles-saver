from puzzle import Puzzle, save, PUZZLESET_DIRECTORY, load_set
import os

def create_new_puzzleset():
    pass

def load_starting_menu():
    print("1. Load Set")
    print("2. Play Random Set")
    print("3. Import New Puzzles")
    print("\n\n\n\n\n")
    choice = input()
    match choice:
        case "1":
            display_load_puzzleset_menu()
        case "2":
            display_generate_random_menu()
        case "3":
            display_import_puzzle_menu()


def display_load_puzzleset_menu():
    puzzlesets = os.listdir(PUZZLESET_DIRECTORY)
    puzzlesets_to_display = ""
    for each in puzzlesets:                 #TODO String comprehension?
        puzzlesets_to_display += each + " "
    print(puzzlesets_to_display)
    choice = input("Load which set? ")
    puzzles_to_play = load_set(choice)
    for puzzle in puzzles_to_play:
        puzzle.play()

    
def display_generate_random_menu():
    pass


def display_import_puzzle_menu():
    print("1. Many (from file)") 
    print("2. One")
    print("\n\n\n\n\n\n\n")
    choice = input()
    match choice:
        case "2":
            display_create_new_puzzle_menu()


def display_create_new_puzzle_menu():
    fen = input("Fen? ")
    solution = input("Solution? ")
    explanation = input("Explanation? ")
    new_puzzle = Puzzle(fen, solution, explanation)
    tags_raw = input("\nTags? ")
    tags = tags_raw.split(", ")
    for tag in tags:
        save(new_puzzle, tag)


if __name__ == "__main__":
    load_starting_menu()