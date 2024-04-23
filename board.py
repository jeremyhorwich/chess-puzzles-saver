import piece

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
    
    def __init__(self, **position_data):
        for key, value in position_data.items():
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


    def insert_piece(self, position, piece: piece):
        pass


    def piece_at(self, position: str):
        try:
            column_index = ord(position[0]) - 97
            row_index = 8 - int(position[1])
            return self.state[row_index][column_index]
        except:
            raise Exception("Position in unexpected format")
    

test = Board()
print(test)