import React, { useState } from "react";

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  { question: "Capital of France?", options: ["London", "Paris", "Berlin"], answer: "Paris" },
  { question: "React is a ___ library?", options: ["Backend", "Frontend", "Database"], answer: "Frontend" }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>CAT Mock Test</h1>
      {!finished ? (
        <div>
          <h2>{questions[current].question}</h2>
          {questions[current].options.map((opt) => (
            <button key={opt} onClick={() => handleAnswer(opt)} style={{ display: "block", margin: "8px 0" }}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <h2>Your Score: {score} / {questions.length}</h2>
      )}
    </div>
  );
}
