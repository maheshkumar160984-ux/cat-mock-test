import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Dummy data (can be replaced with API or Firebase)
const QUESTIONS = [
  {
    id: 1,
    section: "VARC",
    type: "MCQ",
    question: "The author’s central claim is:",
    options: [
      "AI is purely an economic tool, not a political one.",
      "Technological rivalry is reshaping geopolitics.",
      "Nuclear treaties provide sufficient guidance for AI governance.",
      "Open-source AI is a permanent safeguard against misuse."
    ],
    correct: "B",
  },
  {
    id: 2,
    section: "QA",
    type: "TITA",
    question: "Find remainder when 7^2025 + 3^2025 is divided by 100.",
    correct: "28",
  }
];

export default function App() {
  const [student, setStudent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 mins
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(0);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  // Tab-switch detection
  useEffect(() => {
    const handleBlur = () => {
      setWarning((w) => {
        if (w >= 1) {
          handleSubmit();
        }
        return w + 1;
      });
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setStudent({
      name: form.get("name"),
      roll: form.get("roll"),
      email: form.get("email"),
    });
  };

  const handleChange = (qid, val) => {
    setAnswers({ ...answers, [qid]: val });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calcScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id]) {
        if (q.type === "MCQ") {
          if (q.correct === answers[q.id]) score += 3;
          else score -= 1;
        } else if (q.type === "TITA") {
          if (q.correct === answers[q.id]) score += 3;
        }
      }
    });
    return score;
  };

  if (!student) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-96">
          <h2 className="text-xl font-bold">Student Login</h2>
          <input name="name" placeholder="Name" className="border p-2 w-full" required />
          <input name="roll" placeholder="Roll No." className="border p-2 w-full" required />
          <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full">Start Test</button>
        </form>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-green-100">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Test Submitted ✅</h2>
          <p className="text-lg">Name: {student.name} ({student.roll})</p>
          <p className="text-lg">Email: {student.email}</p>
          <p className="text-xl mt-4 font-bold">Score: {calcScore()}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">CAT 2025 Mock Test</h1>
        <span className="text-red-600 font-bold">
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.id} className="bg-white p-4 rounded-2xl shadow mb-4">
          <p className="font-semibold mb-2">
            Q{q.id}. {q.question}
          </p>
          {q.type === "MCQ" ? (
            <div className="space-y-1">
              {q.options.map((opt, idx) => (
                <label key={idx} className="block">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={String.fromCharCode(65 + idx)}
                    checked={answers[q.id] === String.fromCharCode(65 + idx)}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                  <span className="ml-2">{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="border p-2 mt-2"
              placeholder="Enter answer"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded-xl shadow mt-4"
      >
        Submit Test
      </button>
    </div>
  );
}
