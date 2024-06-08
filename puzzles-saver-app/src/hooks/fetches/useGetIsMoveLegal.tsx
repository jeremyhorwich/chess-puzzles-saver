const backend_server = "http://127.0.0.1:8000"

async function useGetIsMoveLegal(fen: string, origin: number, target: number) {
    const queryParams = `fen=${fen}&origin=${origin}&target=${target}`
    try {
        const response = 
            await fetch(
                `${backend_server}/chess/utils/is-move-legal?${queryParams}`
            );
        
        if (!response.ok) {
            throw Error(response.statusText)
        }
        
        const responseJSON = await response.json();
        return responseJSON["legal"]
    } catch (error) {
        console.log(error);
    }
}

export default useGetIsMoveLegal
