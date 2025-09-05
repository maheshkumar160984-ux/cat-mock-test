import { useState, useEffect } from 'react';

export default function ExamPortal() {
  const TOTAL_TIME = 120 * 60; // 120 minutes
  const SECTION_TIME = 40 * 60; // 40 minutes

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
    if (timeLeft % SECTION_TIME === 0 && section < 3 && timeLeft !== TOTAL_TIME) {
      setSection((s) => s + 1);
    }
    if (timeLeft <= 0) {
      alert('Time over! Test submitted automatically.');
      window.close();
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleBlur = () => {
      setWarning((w) => w + 1);
      alert('Warning! Tab switch detected.');
      if (warning >= 1) {
        alert('Test auto-submitted due to repeated tab switch.');
        window.close();
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [warning]);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{background: 'white', padding: 20, borderRadius: 10, width: '600px', textAlign: 'center'}}>
        <h1>CAT Mock Test Portal</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>

          <span>Section: {section}/3</span>

          <span>Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span>

        </div>

        <div style={{border: '1px solid #ccc', padding: 20, marginBottom: 20}}>

          <p>[Questions for Section {section} will appear here...]</p>

        </div>

        <button style={{padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 5}}>Submit Test</button>

      </div>

    </div>

  );
}
