from fastapi import APIRouter
from users import find_user_from

router = APIRouter(prefix="/users")

@router.post("/online-profile-to-user")
async def retrieve_user_from_profile_address(url: str):
    user = await find_user_from(url)
    return user