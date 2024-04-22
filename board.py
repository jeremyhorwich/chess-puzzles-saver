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
            for square in range(0,8):
                occupant = self.state[row][square]
                if occupant == "":
                    row_printout += "[ ]"
                else:
                    row_printout += "[" + occupant + "]"
            board_printout += row_printout + "\n"
        return board_printout


    def insert_piece(self, position, piece: piece):
        pass


    def piece_at(self, position: str):
        if len(position) != 2:
            raise Exception("Position length ", len(position), " expected 2")
        if not position[0].isalpha():
            raise Exception("Position " + position + " in unexpected format.")
        if not position[1].isdigit():
            raise Exception("Position " + position + " in unexpected format.")
        
        #When playing as white, we want to call bottom up
        column_index = ord(position[0]) - 97
        row_index = 8 - int(position[1])
        print(row_index, column_index)
        return self.state[row_index][column_index]
    

test = Board(None)
print(test)