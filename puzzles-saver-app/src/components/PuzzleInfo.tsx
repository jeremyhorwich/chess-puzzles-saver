import "./puzzleInfoStyles.css"

type PuzzleInfoProps = {
    whitePlayer?: string,
    blackPlayer?: string,
    date?: string,
    title?: string
}

function PuzzleInfo(props: PuzzleInfoProps) {
    function parseInfo() {

        if (props.title) {
            return (
                <>
                    <span>{props.title}</span>
                    <span>{props.date}</span>
                </>
            )
        }
    
        if (props.whitePlayer || props.blackPlayer) {
            const whiteDisplay = props.whitePlayer ? props.whitePlayer : "Unknown Opponent";
            const blackDisplay = props.blackPlayer ? props.blackPlayer : "Unknown Opponent";
    
            return ( 
                <>
                    <span>From</span>
                    <span>{whiteDisplay} vs {blackDisplay} </span>
                    <span>{props.date}</span>
                </>
            )
        }
    
        if (props.date) {
            return (
                <>
                    <span>From</span>
                    <span>{props.date}</span>
                </>
            )
        }
        
        return (
            <span>Custom Puzzle</span>
        )
    }

    return <div className="puzzleInfo">{parseInfo()}</div>
}

export default PuzzleInfo;