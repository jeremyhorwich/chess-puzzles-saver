import { useState } from "react";
import './puzzleQuestionStyle.css'

type puzzleQuestion = {
    question: string;
    correctAnswer: string;
    wrongAnswers: Array<string>;
}

function PuzzleQuestionDisplay(props: puzzleQuestion) {
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");

    function handleClick(key: number) {
        setSelectedAnswer(() => 
            (key === 0) ? "Correct!" : "Incorrect"
        )
    }

    return (
        <div className="puzzleQuestionDisplay">
            {props.question}

            <ShuffledAnswers correctAnswer= {props.correctAnswer} 
            wrongAnswers={props.wrongAnswers} handleClick={handleClick} />
            {selectedAnswer}            
        </div>
    )
};

type PuzzleAnswers = {
    correctAnswer: string
    wrongAnswers: Array<string>
    handleClick: Function
};

function ShuffledAnswers(props: PuzzleAnswers) {
    let nullAnswersArray = Array(props.wrongAnswers.length).fill(null);
    const [randomizedAnswers, setAnswersState] = useState<Array<JSX.Element>>(nullAnswersArray);

    if (randomizedAnswers[0] !== null) {
        return (
            <div>{randomizedAnswers}</div>
        )
    };

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

    //if (randomized) {    //Shuffle the answers (Fisher-Yates algorithm)
    let m = answers.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [answers[m],answers[i]] = [answers[i],answers[m]]
    };

    setAnswersState(answers)

    return (
        <div>{answers}</div>
    )
};

export default PuzzleQuestionDisplay;