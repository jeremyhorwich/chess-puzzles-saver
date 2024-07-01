const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function getUserPuzzlesets(username: string) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/users/${username}/sets`
            );
        
        if (!response.ok) {
            throw Error(response.statusText)
        }
        
        const responseJSON = await response.json();
        return responseJSON["sets"]
    } catch (error) {
        console.log(error);
    }
}

export default getUserPuzzlesets
