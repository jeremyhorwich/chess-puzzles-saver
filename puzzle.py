import os

PUZZLESET_DIRECTORY = "sets/"

class Puzzle:
    def __init__(self, fen: str, solution: str, explanation: str):
        self.fen = fen
        self.solution = solution
        self.explanation = explanation
    
    def test(self):
        #Load the board
        #Input a potential solution
        #If solution is wrong then display correct and explanation
        pass


def save(puzzle: Puzzle, filename: str):
    filepath = os.path.join(PUZZLESET_DIRECTORY, filename + ".txt")
    puzzleset = open(filepath,"a")

    #TODO: Don't put in newline if file doesn't exist
    #TODO: Eventually we swtich to JSON formats
    #TODO: Loop through group of puzzles (so we don't open and close
    #   repeatedly)
    export = puzzle.fen + "|" + puzzle.solution + "|" + puzzle.explanation

    puzzleset.write("\n" + export)
    puzzleset.close()


def load_set(filename: str) -> list[Puzzle]:
    filepath = os.path.join(PUZZLESET_DIRECTORY, filename + ".txt")
    stored_puzzles = open(filepath,"r")
    loaded = list()
    for line in stored_puzzles:
        puzzle_data = line.split("|")
        loaded.append(Puzzle(puzzle_data[0],puzzle_data[1],puzzle_data[2]))
    return loaded