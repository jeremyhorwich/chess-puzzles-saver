from board import Board

class Puzzle:
    position = Board()
    solution = None
    explanation = None

    def __init__(self, position: Board, solution: str, explanation: str):
        self.position = position
        self.solution = solution
        self.explanation = explanation
        