import postGeneratePuzzleset from "../fetches/postGeneratePuzzleset"

type GeneratePuzzlesetButtonProps = {
    user: string,
    site: string,
    numberOfPuzzles: number
}

function GeneratePuzzlesetButton(props: GeneratePuzzlesetButtonProps) {
    return (
        <button onSubmit={() => postGeneratePuzzleset(props.user, props.site, props.numberOfPuzzles)}>
            Generate
        </button>
    )
}

export default GeneratePuzzlesetButton