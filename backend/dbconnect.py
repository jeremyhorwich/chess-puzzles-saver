from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ReturnDocument
from dotenv import load_dotenv
from os import getenv
from bson import ObjectId
from models.puzzle import Puzzle, Puzzleset
from models.user import User

load_dotenv()
mongo_user = getenv("MONGO_DB_USER")
mongo_password = getenv("MONGO_DB_PASSWORD")
mongo_uri = ( f"mongodb+srv://{mongo_user}:{mongo_password}"
    "@cluster0.psyf5un.mongodb.net/"
    "?retryWrites=true&w=majority&appName=Cluster0" 
    )

async def get_puzzle(puzzle_id: str) -> Puzzle:
    o_id = ObjectId(puzzle_id)
    db = get_puzzleplayer_db()
    puzzle = await db.Puzzles.find_one({"_id": o_id}, {"_id": 0})
    return puzzle


async def get_puzzle_set(puzzleset_id: str) -> Puzzleset:
    o_id = ObjectId(puzzleset_id)
    db = get_puzzleplayer_db()
    puzzleset = await db.Puzzlesets.find_one({"_id": o_id}, {"_id": 0})
    return puzzleset


async def post_or_get_user(username: str) -> User:
    db = get_puzzleplayer_db()
    user = await db.Users.find_one_and_update(
        {"username": username},
        {"$set": {"username": username}},
        upsert=True,
        projection={"_id": False},
        return_document=ReturnDocument.AFTER  # return the updated document
    )
    return user

async def get_user_puzzlesets(username: str) -> User:
    db = get_puzzleplayer_db()
    user = await db.Users.find_one({"username": username}, {"_id": 0})
    sets = []
    for id in user["sets"]:
        set = await get_puzzle_set(id)
        sets.append(set)
    return {"sets": sets}


def get_puzzleplayer_db():
    client = AsyncIOMotorClient(mongo_uri)
    return client.PuzzlePlayer
