class Puzzle:
    position = None
    solution = None
    explanation = None

    def __init__(self, fen: str, solution: str, explanation: str):
        self.fen = fen
        self.solution = solution
        self.explanation = explanation
        