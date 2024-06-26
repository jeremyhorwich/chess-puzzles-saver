from pydantic import BaseModel
from typing import Optional

class Puzzle(BaseModel):
    fen: str
    answer: str
    title: Optional[str] = None
    date: Optional[str] = None
    whitePlayer: Optional[str] = None
    blackPlayer: Optional[str] = None


class Puzzleset(BaseModel):
    name: str
    puzzles: list[str]