class Piece:
    side = "White"
    movement = None
    def __init__(self, _side):
        if type(self) == Piece:
            raise Exception("You cannot instantiate Piece directly.")
        
        self.side = _side
        
    def __str__(self):
        return self.side + " " + str(type(self).__name__)


#TODO - Individual Pieces

class Queen(Piece):
    pass


class Rook(Piece):
    pass


class Bishop(Piece):
    pass


class Knight(Piece):
    pass


class Pawn(Piece):
    pass


piece_one = Queen("White")
print(piece_one)