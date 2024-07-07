const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function getMoveSANFromCoords(fen: string, origin: number, target: number, promotionPiece: string | null = null) {
    let queryParams = `fen=${fen}&origin=${origin}&target=${target}`
    if (promotionPiece) {
        queryParams = queryParams + `&promotionPiece=${promotionPiece}`
    }
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/chess/utils/move-indices-to-san?${queryParams}`
            );
        
        if (!response.ok) {
            throw Error(response.statusText)
        }
    
        const responseJSON = await response.json();
        return responseJSON["san"]
    } catch (error) {
        console.log(error)
    }
}

export default getMoveSANFromCoords
