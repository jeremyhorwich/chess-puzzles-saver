from pydantic import BaseModel
from typing import Optional

class PlayerInfo(BaseModel):
    username: str
    rating: int
    result: str

class Accuracy(BaseModel):
    white: float
    black: float

class MonthlyArchiveGame(BaseModel):
    url: str
    pgn: str
    time_control: str
    end_time: int
    rated: bool
    accuracies: Optional[Accuracy] = None
    tcn: str
    uuid: str
    initial_setup: str
    fen: str
    time_class: str
    rules: str
    white: PlayerInfo
    black: PlayerInfo