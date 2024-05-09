import { useState } from "react";
import './puzzleQuestionStyle.css'

type puzzleQuestion = {
    question: string;
    correctAnswer: string;
    wrongAnswers: Array<string>;
}

function PuzzleQuestionDisplay(props: puzzleQuestion) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    let correctSelected = false;

    function handleClick(key: number) {
        setSelectedAnswer(key)
        correctSelected = (key === 0) ? true : false;
    }

    return (
        <div className="puzzleQuestionDisplay">
            <ShuffledAnswers correctAnswer={props.correctAnswer} 
                             wrongAnswers={props.wrongAnswers} 
                             handleClick={handleClick} />
            {selectedAnswer && <CorrectnessOfAnswer correct={correctSelected}/>}            
        </div>
    )
  };

type PuzzleAnswers = {
    correctAnswer: string
    wrongAnswers: Array<string>
    handleClick: Function
};

function ShuffledAnswers(props: PuzzleAnswers) {
    let answerKeys = 0;
    const answers = props.wrongAnswers.map((answer) => {
        answerKeys++
        return ( 
        <button key={answerKeys} onClick={() => props.handleClick(answerKeys)}>
            {answer}
        </button>
        )
    }
    );

    answers.push(
        <button key={0} onClick={() => props.handleClick(0)}>
            {props.correctAnswer}
        </button>
    )

    //Shuffle the answers (Fisher-Yates algorithm)
    let m = answers.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [answers[m],answers[i]] = [answers[i],answers[m]]
    };

    return (
        <div>{answers}</div>
    )
};


function CorrectnessOfAnswer(props: {correct: boolean}) {
    let msg = props.correct ? "Correct!" : "Try Again"
    return (
        <div>{msg}</div>
    )
};


export default PuzzleQuestionDisplay;