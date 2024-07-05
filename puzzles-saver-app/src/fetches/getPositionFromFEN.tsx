const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function getPositionFromFEN(fen: string) {
    try {
        const response = await fetch(`${backendBaseURL}/chess/utils/fen-to-pieces-coords?fen=${fen}`);
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const positionJSON = await response.json();
        return positionJSON
    } catch (error) {
        console.log(error);
    }
}

export default getPositionFromFEN;