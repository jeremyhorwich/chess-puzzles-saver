import { useState } from "react";
import './puzzleQuestionStyle.css'

type puzzleQuestion = {
    question: string;
    correctAnswer: string;
    wrongAnswers: Array<string>;
}

function PuzzleQuestionDisplay(props: puzzleQuestion) {
    const [value, setValue] = useState<string | null>(null);

    function handleClick(key: number) {
        let msg;
        msg = (key === 0) ? "Correct" : "Incorrect";
        setValue(msg)
    }

    let answerKeys = 0;
    const answers = props.wrongAnswers.map((answer) => {
        answerKeys++
        return ( 
        <button key={answerKeys} onClick={() => handleClick(answerKeys)}>
            {answer}
        </button>
        )
    }
    );

    //Shuffle the answers (Fisher-Yates algorithm)
    answers.push(
        <button key={0} onClick={() => handleClick(0)}>
            {props.correctAnswer}
        </button>
    )

    let m = answers.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [answers[m],answers[i]] = [answers[i],answers[m]]
    };


    return (
        <div className="puzzleQuestionDisplay">
            {props.question}
            {answers}
            {value}
        </div>
    )
  };

  export default PuzzleQuestionDisplay