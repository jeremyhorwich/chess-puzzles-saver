const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function useGetPuzzleset(_id: string) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/chess/puzzlesets/${_id}`
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

export default useGetPuzzleset