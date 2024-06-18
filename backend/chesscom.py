from requests import get
from pydantic import BaseModel

def clean_extraneous_info_from_pgn(pgn: str) -> str:
    pass

def get_player_monthly_archive(player_name: str, month: str, year: str) -> dict:
    url = "https://api.chess.com/"\
         f"pub/player/{player_name}/games/{month}/{year}"
    user_agent_header = {"user-agent": "chess-puzzles-saver/0.0.1"}
    r = get(url, headers=user_agent_header)
    return r.json()
    

def get_info():
    r = get("https://api.chess.com/pub/player/erik", headers={"user-agent": "my-app/0.0.1"})
    j = r.json()
    print(j["player_id"])


class MonthlyArchiveGame(BaseModel):    
    pass
