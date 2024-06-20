from chesscom import get_player_monthly_archive
from datetime import date 

def previous_monthly_archive_date(year: str, month: str):
    if month == "01":
        return str(int(year) - 1), "12"
    previous_month = int(month) - 1
    if previous_month < 10:
        return year, "0" + str(previous_month)
    return year, str(previous_month)

def current_monthly_archive_date():
    year = date.today().year
    month = date.today().month
    if month < 10:
        return year, "0" + str(month)
    return year, str(month)

def get_most_recent_games_from(profile: str, 
                               number_to_find: int,
                               **filters):
    #TODO update to use https://api.chess.com/pub/player/{username}/games/archives
    #See https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive
    year_to_search, month_to_search = current_monthly_archive_date()
    games = []
    while len(games) < number_to_find:
        previous_archive = get_player_monthly_archive(profile, 
                                                      year_to_search, 
                                                      month_to_search)
        if len(previous_archive) == 0:
            break
        
        games.append(previous_archive.reverse())
        year_to_search, month_to_search = previous_monthly_archive_date(
            year_to_search, month_to_search)
    return games[0:number_to_find]

print(get_most_recent_games_from("jeremyhorwich",10))