from pydantic import BaseModel

class PlayerInfo(BaseModel):
    username: str
    rating: int
    result: str
    id: str

class Accuracy(BaseModel):
    white: float
    black: float

class MonthlyArchiveGame(BaseModel):
    url: str
    pgn: str
    time_control: str
    end_time: str
    rated: bool
    accuracies: Accuracy
    tcn: str
    uuid: str
    initial_setup: str
    fen: str
    time_class: str
    rules: str
    white: PlayerInfo
    black: PlayerInfo
