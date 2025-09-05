import { useState, useEffect } from "react";

export default function ExamPortal() {
  const TOTAL_TIME = 120 * 60; // 120 minutes in seconds
  const SECTION_TIME = 40 * 60; // 40 minutes per section

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [section, setSection] = useState(1);
  const [warning, setWarning] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft % SECTION_TIME === 0 && section < 3) {
      setSection((s) => s + 1);
    }
    if (timeLeft <= 0) {
      alert("Time over! Test submitted automatically.");
      window.close();
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleBlur = () => {
      setWarning((w) => w + 1);
      alert("Warning! Tab switch detected.");
      if (warning >= 1) {
        alert("Test auto-submitted due to repeated tab switch.");
        window.close();
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [warning]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">CAT Mock Test Portal</h1>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Section: {section}/3</span>
          <span className="font-mono">Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</span>
        </div>

        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <p className="text-gray-700">[Questions for Section {section} will be displayed here...]</p>
        </div>

        <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Submit Test
        </button>
      </div>
    </div>
  );
}
