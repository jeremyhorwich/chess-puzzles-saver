const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function postOrGetUser(profileAddress: string) {
    const queryParams = `url=${profileAddress}`
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/users/online-profile-to-user?${queryParams}`, {
                    method: "POST"
                }
            );
        
        if (!response.ok) {
            throw Error(response.statusText)
        }
        
        const responseJSON = await response.json();
        return responseJSON["username"]
    } catch (error) {
        console.log(error);
    }
}

export default postOrGetUser