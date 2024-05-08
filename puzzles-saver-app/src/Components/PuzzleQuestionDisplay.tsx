import './puzzleQuestionStyle.css'

type puzzleQuestion = {
    question: string
    correctAnswer: string
    //wrongAnswers: Array<string>
  }
  
  function PuzzleQuestionDisplay(props: puzzleQuestion) {
    function handleClick() {
        console.log("clicked")
    }

    return (
        <div className="puzzleQuestionDisplay">
            {props.question}
            <button onClick={handleClick}>{props.correctAnswer}</button>
        </div>
    )
  }

  export default PuzzleQuestionDisplay