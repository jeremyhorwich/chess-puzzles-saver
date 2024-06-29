from dbconnect import post_or_get_user

def parse_online_profile(url: str):
    HTTP_PREFIX = "https://"
    CHESSCOM_MEMBER_FORMAT = "chess.com/member/"
    
    prefix_len = len(CHESSCOM_MEMBER_FORMAT)
    if url[0:(prefix_len)] == CHESSCOM_MEMBER_FORMAT:
        return url[prefix_len:]

    CHESSCOM_MEMBER_FORMAT = "www." + CHESSCOM_MEMBER_FORMAT
    prefix_len = len(CHESSCOM_MEMBER_FORMAT)
    if url[0:(prefix_len)] == CHESSCOM_MEMBER_FORMAT:
        return url[prefix_len:]
    
    prefix_len += len(HTTP_PREFIX)
    if url[0:(prefix_len)] == HTTP_PREFIX + CHESSCOM_MEMBER_FORMAT:
        return url[prefix_len:]
    
    return None

async def find_user_from(url: str):
    username = parse_online_profile(url)
    user = await post_or_get_user(username)
    return user