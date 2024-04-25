import os

class Puzzle:
    def __init__(self, fen: str, solution: str, explanation: str):
        self.fen = fen
        self.solution = solution
        self.explanation = explanation

def save(puzzle: Puzzle, filename: str):
    PUZZLESET_DIRECTORY = "sets/"
    filepath = os.path.join(PUZZLESET_DIRECTORY, filename + ".txt")
    puzzleset = open(filepath,"a")

    #TODO: Don't put in newline if file doesn't exist
    export = puzzle.fen + "|" + puzzle.solution + "|" + puzzle.explanation

    puzzleset.write("\n" + export)
    puzzleset.close()