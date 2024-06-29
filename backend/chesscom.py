from requests import get
from models.archive import MonthlyArchiveGame
from models.puzzle import Puzzle
from pydantic import HttpUrl
from uci import generate_puzzleset


def clean_extraneous_info_from(verbose_pgn: str) -> str:
    split_pgn = verbose_pgn.split(" ")
    START_LINE = 29
    end_line = len(split_pgn) - 3
    SHOULD_PRINT_MULTIPLES = [1,2,6]
    
    cleaned = "1. "
    for i in range(START_LINE, end_line):
        if ((i - START_LINE + 2) % 8 in SHOULD_PRINT_MULTIPLES):
            cleaned += split_pgn[i] + " "
    print(cleaned)
    return cleaned
        

def get_player_monthly_archive(archive_url: HttpUrl = None,
                               player_name: str = None,
                               year: str = None,
                               month: str = None
                               ) -> list[MonthlyArchiveGame]:
    if archive_url:
        url = archive_url
    else:
        url = "https://api.chess.com/"\
            f"pub/player/{player_name}/games/{year}/{month}"
    user_agent_header = {"user-agent": "chess-puzzles-saver/0.0.1"}
    r = get(url, headers=user_agent_header)
    j = r.json()

    games = [MonthlyArchiveGame(**game) for game in j["games"]]
    return games


def get_player_archives(profile: str) -> list[HttpUrl]:
    url = f"https://api.chess.com/pub/player/{profile}/games/archives"
    user_agent_header = {"user-agent": "chess-puzzles-saver/0.0.1"}
    r = get(url, headers=user_agent_header)
    j = r.json()
    return j["archives"]


def get_recent_games_from(profile: str, 
                          number_to_find: int,
                          **filters) -> list[MonthlyArchiveGame]:
    archives = get_player_archives(profile)
    #TODO error handling - what if player has no games?
    #TODO filtering
    
    games = []
    for archive in reversed(archives):
        next_most_recent_games = get_player_monthly_archive(archive)
        next_most_recent_games.reverse()
        games.extend(next_most_recent_games)
        if len(games) >= number_to_find:
            break
    
    return games[0:number_to_find]

def generate_player_puzzles(profile: str, number_to_generate: int
                            ) -> list[Puzzle]:
    recent_games = get_recent_games_from(profile, number_to_generate)
    return generate_puzzleset(recent_games, number_to_generate, profile)