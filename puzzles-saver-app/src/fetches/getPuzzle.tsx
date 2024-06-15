const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function getPuzzle(_id: string) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/chess/puzzles/${_id}`
            );
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        const responseJSON = await response.json();
        return responseJSON
    } catch (error) {
        console.log(error);
    }
}

export default getPuzzle