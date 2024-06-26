from board import fen_to_fields
from io import StringIO
from dotenv import load_dotenv
from os import getenv
from models.puzzle import Puzzle
from models.archive import MonthlyArchiveGame
import chess
import chess.engine
import chess.pgn
import heapq

load_dotenv()
STOCKFISH = getenv("STOCKFISH")
DEPTH = 15

def analyse_board(board: chess.Board, variations: int) -> chess.engine.InfoDict:
    engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH)
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
    return analysis["score"].white().score(mate_score=100000)


def score_difference_of_best_and(actual: str, fen: str):
    WINNING_THRESHOLD = 400

    white_to_move = not fen_to_fields(fen)[1]
    
    best_move = find_top_n_moves(1, fen)[0]
    board = chess.Board(fen)
    board.push(best_move)
    best_score = score_position(board.fen())

    board.pop()
    if best_move == actual:
        return 0, best_move
    
    board.push(actual)
    actual_score = score_position(board.fen())

    if actual_score is None:
        print(actual, board.fen())

    if not white_to_move:
        best_score, actual_score = best_score * -1, actual_score * -1
    
    pov_is_winning = actual_score > WINNING_THRESHOLD
    if pov_is_winning:
        return (40000 / actual_score), best_move

    return (best_score - actual_score) * (100 / best_score), best_move


def find_n_worst_mistakes(n: int, pgn: str, player: int = None):
    worstq = []

    pgn_stream = StringIO(pgn)
    game = chess.pgn.read_game(pgn_stream)
    board = game.board()

    turn = 1
    for move in game.mainline_moves():    
        turn = (turn + 1) % 2
        if player is not None:
            if turn != player:
                board.push(move)
                continue
        error, best = score_difference_of_best_and(move, board.fen())
        _id = id(move)
        if len(worstq) < n:
            heapq.heappush(worstq, (error, _id, best, board.fen()))
        else:
            heapq.heappushpop(worstq, (error, _id, best, board.fen()))
        board.push(move)

    return worstq
    
def generate_puzzleset(games: list[MonthlyArchiveGame], 
                       number_of_puzzles: int,
                       player: str = None
                       ) -> list[Puzzle]:
    mistakesq = []
    TILT_THRESHOLD = 3  #More bad mistakes than this per game indicates tilt
    for game in games:
        pov = None
        if player:
            if player == game.white.username:
                pov = 0
            else:
                pov = 1
        mistakes = find_n_worst_mistakes(TILT_THRESHOLD, game.pgn, pov)
        for mistake in mistakes:
            _id = id(mistake)
            fen = mistake[3]
            board = chess.Board(fen)
            answer = board.san(mistake[2])
            puzzle = Puzzle(fen=fen,
                            answer=answer,
                            whitePlayer=game.white.username,
                            blackPlayer=game.black.username)
            if len(mistakesq) < number_of_puzzles:
                heapq.heappush(mistakesq, (mistake[0], _id, puzzle))
            else:
                heapq.heappushpop(mistakesq, (mistake[0], _id, puzzle))
    return [puzzle for _, __, puzzle in mistakesq]
