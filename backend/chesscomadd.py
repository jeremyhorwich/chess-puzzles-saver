from chesscom import get_player_monthly_archive
from datetime import date 
from requests import get
from pydantic import HttpUrl

def get_player_archives(profile: str) -> list[HttpUrl]:
    url = f"https://api.chess.com/pub/player/{profile}/games/archives"
    user_agent_header = {"user-agent": "chess-puzzles-saver/0.0.1"}
    r = get(url, headers=user_agent_header)
    j = r.json()
    return j["archives"]

def get_most_recent_games_from(profile: str, 
                               number_to_find: int,
                               **filters):
    archives = get_player_archives(profile)
    #TODO error handling - what if player has no games?
    
    games = []
    for archive in archives:
        next_most_recent_games = get_player_monthly_archive(archive)
        games.append(next_most_recent_games.reverse())
        if len(games) >= number_to_find:
            break
    return games[0:number_to_find]

print(get_most_recent_games_from("jeremyhorwich",10))