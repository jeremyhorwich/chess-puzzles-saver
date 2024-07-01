from fastapi import APIRouter
from users import find_user_from
from dbconnect import get_user_puzzlesets

router = APIRouter(prefix="/users")

@router.post("/online-profile-to-user")
async def retrieve_user_from_profile_address(url: str):
    user = await find_user_from(url)
    return user

@router.get("/{user}/sets")
async def get_user_sets(user: str):
    sets = await get_user_puzzlesets(user)
    return sets