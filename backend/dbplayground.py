from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def main():
    mongo_uri = "mongodb+srv://user0:<PASS>@cluster0.psyf5un.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = AsyncIOMotorClient(mongo_uri)
    db = client.PuzzlePlayer
    puzzle1 = await db.Puzzles.find_one()
    print(puzzle1)

asyncio.run(main())