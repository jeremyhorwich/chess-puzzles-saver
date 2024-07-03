const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function postGeneratePuzzleset(username: string, site: string, numberOfPuzzles: number) {
    const queryParams = `username=${username}&site=${site}&numberOfPuzzles=${numberOfPuzzles}`
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/chess/puzzles/create-puzzles-from-profile/${queryParams}`, {
                    method: "POST"
                }
            );
        
        if (!response.ok) {
            throw Error(response.statusText)
        }
        
        const responseJSON = await response.json();
        return responseJSON["puzzles"]
    } catch (error) {
        console.log(error);
    }
}

export default postGeneratePuzzleset