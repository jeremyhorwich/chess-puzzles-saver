def load(fen):
    pass

#Change piece position to array object
def covert_raw_to_array_readable(raw: str, 
                                 row_offset: int,
                                 column_offset) -> list[tuple]:
    true_row = 8 - row_offset
    column_offset
    return (raw, row_offset, column_offset)
    #TODO - is this function doing anything useful?

class Fen():
    def __init__(self, raw: str):
        char_generator = enumerate(raw)
        next_char = next(char_generator)

        #TODO: Handle errors

        while (next_char != " "):
            current_char = next_char
            #Interact with the board

            #"piece" "a" "1"
            next_char = next(char_generator)

    pass