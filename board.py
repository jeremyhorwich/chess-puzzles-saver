#TODO: Format error handling
def _algebraic_to_coord(algebraic_position: str) -> tuple[int, int]:
    column = ord(algebraic_position[0]) - 97
    row = 8 - int(algebraic_position[1])
    return row, column

#TODO: Format error handling
#TODO: Change to convert to algebraic notation, then in Board convert
#   to coordinates. We don't need to know coords outside of board
def _get_piece_coordinates(raw: str) -> list[tuple]:
    coordinates = list()
    current_row = 0
    current_column = 0
    for char in raw:
        if char == "/":
            current_row += 1
            current_column = 0
            continue
        if char.isdigit():
            current_column += int(char)
            continue
        coordinates.append((current_row,current_column,char))
        current_column += 1
    return coordinates

def _get_turn(raw: str) -> str:
    if raw == "w":
        return 0
    return 1

#Format of FEN:
#(1) Piece positions, (2) Whose move (3) Castling rights
#(4) En passant availability (5) Halfmoves (6) FullMoves

#Sample FEN (for reference):
#8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50

def _load(fen: str) -> list:
    fields = fen.split()
    fields[0] = _get_piece_coordinates(fields[0])
    fields[1] = _get_turn(fields[1])
    return fields

class Board: 
    #TODO: Protect this from being able to update ANY attribute
    def __init__(self, fen: str):
        self.state = [["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""]]
        
        unpacked_fen = _load(fen)

        self.turn = unpacked_fen[1]
        self.castling = unpacked_fen[2]
        self.en_passant = unpacked_fen[3]
        self.halfmoves = unpacked_fen[4]
        self.fullmoves = unpacked_fen[5]
        
        self.insert_pieces(unpacked_fen[0])


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