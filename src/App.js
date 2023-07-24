import React, { useEffect, useState } from 'react';
import Questions from './components/data/questions.json'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Result from './components/Result';
import Question from './components/Question';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [checked, setChecked] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Grab Current Quiz.
  const presentQuiz = questions[currentQuestion];
  const presentid = presentQuiz?.id;
  const presentQuestion = presentQuiz?.question;
  const presentOptions = presentQuiz?.options;
  const presentanswer = presentQuiz?.answer;

  // Fetch Questions and Timer Start Function.
  useEffect(() => {
    setQuestions(Questions)
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => { clearInterval(interval) };
  }, []);

  // Timer End Function.
  useEffect(() => {
    if (timer === 0) {
      if (parseInt(presentid) + 1 < questions.length) {
        setChecked(false)
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setTimer(10);
      } else {
        setShowResult(true);
      }
    }
  }, [timer]);

  // Handle Answer.
  const handleAnswer = (selectedOption) => {
    setChecked(selectedOption)
    if (selectedOption === presentanswer) {
      setScore((prevScore) => prevScore + 1 / 2);
    }
  };

  // Handle Next Quiz.
  const handleNextQuiz = () => {
    if (parseInt(presentid) + 1 < questions.length) {
      setChecked(false)
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  }

  // Handle Previous Quiz.
  const handlePreviousQuiz = () => {
    if (parseInt(presentid) - 1 >= 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  // Handle Restart Quiz.
  const handleRestartQuiz = () => {
    setTimer(10);
    setScore(0);
    setCurrentQuestion(0);
    setChecked(false)
    setShowResult(false);
  }

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`${darkMode ? "bg-slate-800 text-gray-200" : "bg-gray-200 text-gray-800"}`}>
        {showResult ? (
          <Result
            score={score}
            questions={questions}
            handleRestartQuiz={handleRestartQuiz}
            darkMode={darkMode}
          />
        ) : (
          <div className="container mx-auto p-4">
            <h3 className={`text-xl flex flex-wrap justify-between items-center mb-8 pb-2 max-[450px]:text-sm max-[315px]:flex-col border-b ${darkMode ? "border-gray-200" : "border-gray-800"}`}>
              <span>Question <span className='font-semibold'>{parseInt(presentid) + 1}</span> of <span className='font-semibold'>{questions.length}</span></span>
              <span>Time remaining: <span className='font-semibold'>{timer}</span> seconds</span>
            </h3>
            <Question
              questions={questions}
              presentid={presentid}
              presentQuestion={presentQuestion}
              presentOptions={presentOptions}
              checked={checked}
              setChecked={setChecked}
              handleAnswer={handleAnswer}
              handleNextQuiz={handleNextQuiz}
              handlePreviousQuiz={handlePreviousQuiz}
              darkMode={darkMode}
            />
          </div>
        )}
      </div >
      <Footer darkMode={darkMode} />
    </>
  );
}

export default App;