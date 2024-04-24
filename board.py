#TODO: Format error handling
def _algebraic_to_coord(algebraic_position: str) -> tuple[int, int]:
    column = ord(algebraic_position[0]) - 97
    row = 8 - int(algebraic_position[1])
    return row, column

class Board:
    state = [["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""],
             ["","","","","","","",""]]
    turn = 0
    castling = "-"
    en_passant = "-"
    halfmoves = 0
    fullmoves = 0
    
    #TODO: Protect this from being able to update ANY attribute
    def __init__(self, piece_coordinates, **extrapositional_data):
        self.insert_pieces(piece_coordinates)
        for key, value in extrapositional_data.items():
            setattr(self, key, value)


    def __str__(self):
        printout = ""
        if self.turn == 0:
            printout += "White to move     "
        else:
            printout += "Black to move     "
        printout += "Castling: " + self.castling + "     "
        printout += "En Passant: " + self.en_passant + "\n"
        printout += "Halfmoves: " + str(self.halfmoves) + "     "
        printout += "Fullmoves: " + str(self.fullmoves) + "\n"

        for row in range(0,8):
            row_printout = ""
            for position in range(0,8):
                occupant = self.state[row][position]
                if occupant == "":
                    row_printout += "[ ]"
                else:
                    row_printout += "[" + occupant + "]"
            printout += row_printout + "\n"
        return printout


    def insert_pieces(self, piece_coordinates: list):
        for location_info in piece_coordinates:            
            row,column = location_info[0], location_info[1]
            piece = location_info[2]
            self.state[row][column] = piece


    def piece_at(self, algebraic_position: str):
        row, column = _algebraic_to_coord(algebraic_position)
        return self.state[row][column]
    
    #TODO: Legality
    def move_piece(self, origin: str, target: str):
        origin_row, origin_column = _algebraic_to_coord(origin)
        target_row, target_column = _algebraic_to_coord(target)
        piece = self.state[origin_row][origin_column]
        self.state[origin_row][origin_column] = ""
        self.state[target_row][target_column] = piece
        #NOTE: Here is where we would log the capture
        
from fen import load
test_data = load("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50")
new_board = Board(test_data[0], castling=test_data[2], en_passant=test_data[3], halfmoves=test_data[4], turn=test_data[1], fullmoves=test_data[5])
print(new_board)
new_board.move_piece("f7", "g7")
print(new_board) 

#Desired state: new_board.move_piece("f7", "g7")