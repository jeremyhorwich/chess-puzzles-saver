import os
from board import Board

PUZZLESET_DIRECTORY = "sets/"

class Puzzle:
    def __init__(self, fen: str, solution: str, explanation: str):
        self.fen = fen
        self.solution = solution
        self.explanation = explanation
    
    def play(self):
        board = Board(self.fen)
        print(board)
        guess = input("Solution? ")
        if guess == self.solution:
            #TODO: Test on the rest of the variation?
            print("Correct!")
        else:
            print(f"Wrong. Correct is {self.solution}")
            #TODO: Show the rest of the variation?
        adjust = input("Adjust tags? Y/N ")
        if adjust.lower() != "y":
            return
        tags_raw = input("Tags to add? ")
        tags = tags_raw.split(", ")
        for tag in tags:
            save(self, tag)
    
    def raw(self) -> str:
        return f"{self.fen}|{self.solution}|{self.explanation}"

#TODO: Eventually we swtich to JSON formats
#TODO: Loop through group of puzzles (so we don't open and close
#   repeatedly)
def save(puzzle: Puzzle, filename: str):
    filepath = os.path.join(PUZZLESET_DIRECTORY, filename + ".txt")
    puzzleset = open(filepath,"a")

    #TODO: Don't put in newline if file doesn't exist

    puzzleset.write("\n" + puzzle.raw())
    puzzleset.close()


def load_set(filename: str) -> list[Puzzle]:
    filepath = os.path.join(PUZZLESET_DIRECTORY, filename + ".txt")
    stored_puzzles = open(filepath,"r")
    loaded = list()
    for line in stored_puzzles:
        puzzle_data = line.split("|")
        loaded.append(Puzzle(puzzle_data[0],puzzle_data[1],puzzle_data[2]))
    return loaded