import postGeneratePuzzleset from "../fetches/postGeneratePuzzleset"
import '../styles/generatePuzzlesetButtonStyles.css';


type GeneratePuzzlesetButtonProps = {
    user: string,
    site: string,
    numberOfPuzzles: number
}

function GeneratePuzzlesetButton(props: GeneratePuzzlesetButtonProps) {
    return (
        <button 
            onSubmit={() => 
            postGeneratePuzzleset(props.user, props.site, props.numberOfPuzzles)}
            className="button"
        >
            Generate new set
        </button>
    )
}

export default GeneratePuzzlesetButton