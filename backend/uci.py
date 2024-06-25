import chess
import chess.engine
import chess.pgn
import heapq
from board import fen_to_fields
from io import StringIO

address = r"C:\Users\fishguy\Downloads\stockfish-windows-x86-64-sse41-popcnt\stockfish\stockfish-windows-x86-64-sse41-popcnt"
DEPTH = 15

test_fen = "6k1/pp3p2/1nq3p1/4PP1p/2pP4/P4Q1P/1P6/1B5K w - - 1 38" #Eval should be ~2.9

def analyse_board(board: chess.Board, variations: int) -> chess.engine.InfoDict:
    engine = chess.engine.SimpleEngine.popen_uci(address)
    analysis = engine.analyse(board, 
                              chess.engine.Limit(depth=DEPTH), 
                              multipv=variations)
    engine.quit()
    return analysis

def find_top_n_moves(n: int, fen: str) -> list[str]:
    board = chess.Board(fen)
    analysis = analyse_board(board, n)
    return [variation["pv"][0] for variation in analysis]

def score_position(fen: str) -> int:
    board = chess.Board(fen)
    analysis = analyse_board(board, 1)[0]
    return analysis["score"].white().score()

def score_difference_of_best_and(actual: str, fen: str):
    white_to_move = not fen_to_fields(fen)[1]   #TODO ponder this
    
    best_move = find_top_n_moves(1, fen)[0]
    board = chess.Board(fen)
    board.push(best_move)
    best_score = score_position(board.fen())

    board.pop()
    if best_move == actual:
        return 0
    
    board.push(actual)
    actual_score = score_position(board.fen())

    difference_from_white_pov = best_score - actual_score

    if white_to_move:
        return difference_from_white_pov
    return -1 * difference_from_white_pov

def find_n_worst_mistakes(n: int, pgn: str, player: int):
    worstq = []

    pgn_stream = StringIO(pgn)
    game = chess.pgn.read_game(pgn_stream)
    board = game.board()

    turn = 1
    for move in game:    
        turn = (turn + 1) % 2
        if turn != player:
            board.push(move)
            continue
        error = score_difference_of_best_and(move, board.fen())
        if len(worstq) < n:
            heapq.heappush(worstq, (-error, move, board.fen()))
        else:
            heapq.heappushpop(worstq, (-error, move, board.fen()))
        board.push(move)

    n_worst = [(move, fen) for _, move, fen in worstq]
    return n_worst
    
print(find_n_worst_mistakes(4,"1. e4 e5 2. Nf3 *"))