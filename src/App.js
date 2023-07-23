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

  // Grab Current Quiz.
  const presentQuiz = questions[currentQuestion];
  const presentid = presentQuiz?.id;
  const presentQuestion = presentQuiz?.question;
  const presentOptions = presentQuiz?.options;
  const presentanswer = presentQuiz?.answer;

  // Fetch Questions.
  useEffect(() => {
    setQuestions(Questions)
  }, [])

  // Timer Start Function.
  useEffect(() => {
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
    console.log("selectedOption", selectedOption, "presentanswer", presentanswer);
    if (selectedOption === presentanswer) {
      setScore((prevScore) => prevScore + 1);
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
    setShowResult(false);
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-600">
        {showResult ? (
          <Result
            score={score}
            questions={questions}
            handleRestartQuiz={handleRestartQuiz}
          />
        ) : (
          <div className="container mx-auto p-4">
            <h1 className='text-gray-200 text-4xl text-center mb-5 pb-2 border-b-2'>JavaScript Quiz</h1>
            <h3 className='text-gray-200 text-xl mb-4 flex justify-between items-center'>
              <span>Question {parseInt(presentid) + 1} of {questions.length}</span>
              <span>Time remaining: {timer} seconds</span>
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
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;