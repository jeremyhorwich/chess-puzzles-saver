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
    
    def __init__(self, pos_data):
        pass


    def __str__(self):
        #Pretty print self.state
        board_printout = ""
        for row in range(0,8):
            row_printout = ""
            for position in range(0,8):
                occupant = self.state[row][position]
                if occupant == "":
                    row_printout += "[ ]"
                else:
                    row_printout += "[" + occupant + "]"
            board_printout += row_printout + "\n"
        return board_printout


    def insert_piece(self, position, piece: piece):
        pass


    def piece_at(self, position: str):
        try:
            column_index = ord(position[0]) - 97
            row_index = 8 - int(position[1])
            return self.state[row_index][column_index]
        except:
            raise Exception("Position in unexpected format")
    

test = Board(None)
print(test.piece_at("as"))
print(test)