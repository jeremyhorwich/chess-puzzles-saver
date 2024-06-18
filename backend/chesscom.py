from requests import get
from models.archive import MonthlyArchiveGame


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
        

def get_player_monthly_archive(player_name: str, year: str, month: str) -> list[MonthlyArchiveGame]:
    url = "https://api.chess.com/"\
         f"pub/player/{player_name}/games/{year}/{month}"
    user_agent_header = {"user-agent": "chess-puzzles-saver/0.0.1"}
    r = get(url, headers=user_agent_header)
    j = r.json()
    return j["games"]