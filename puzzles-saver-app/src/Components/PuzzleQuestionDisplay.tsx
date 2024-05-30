import { useState } from "react";
import '../styles/puzzleQuestionStyle.css';

export default PuzzleQuestionDisplay;

type puzzleQuestion = {
    question: string;
    correctAnswer: string;
    wrongAnswers: Array<string>;
}

function PuzzleQuestionDisplay(props: puzzleQuestion) {
    const [msg, setMsg] = useState<string>("");

    function handleClick(selected: string) {
        setMsg(selected);
    };

    return (
        <div className="puzzleQuestionDisplay">
            {props.question}

            <ShuffledAnswers 
                correctAnswer={props.correctAnswer} 
                wrongAnswers={props.wrongAnswers} 
                handleClick={handleClick} />
            {msg}            
        </div>
    )
};

type PuzzleAnswers = {
    correctAnswer: string;
    wrongAnswers: Array<string>;
    handleClick: Function;
};

function ShuffledAnswers(props: PuzzleAnswers) {
    const nullAnswersArray = Array(props.wrongAnswers.length).fill(null);
    const [randomizedAnswers, setAnswersState] = useState<Array<JSX.Element>>(nullAnswersArray);

    const alreadyRandomized = randomizedAnswers[0] !== null;
    if (alreadyRandomized) {
        return (
            <div>{randomizedAnswers}</div>
        )
    };

    const answers = props.wrongAnswers.map((answer) => {
        return ( 
            <button key={answer} onClick={() => props.handleClick("Incorrect!")}>
                {answer}
            </button>
        )
    }
    );

    answers.push(
        <button key={props.correctAnswer} onClick={() => props.handleClick("Correc!")}>
            {props.correctAnswer}
        </button>
    );

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