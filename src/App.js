import React, { useEffect, useState } from 'react';
import Questions from './components/data/questions.json'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(300);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [checked, setChecked] = useState(false);

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
      setShowResult(true);
    }
  }, [timer]);

  // Handle Answer.
  const handleAnswer = (selectedOption) => {
    setChecked(selectedOption)
    if (selectedOption === presentanswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle Next Quiz.
  const handleNextQuiz = () => {
    if (parseInt(presentid) + 1 < questions.length) {
      setChecked(false)
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
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
    setTimer(300);
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-600">
        {showResult ? (
          <div className='container mx-auto p-4'>
            {/* Result-Box */}
            <div className='bg-slate-200 p-5 my-10 rounded-md flex flex-col justify-center items-center'>
              <h1 className="text-4xl text-center font-semibold">Quiz Complete!</h1>
              <p className="text-2xl my-4">Your score: {score}/{questions.length}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRestartQuiz}>Restart Quiz &#8635;</button>
            </div>
            {/* Result-Box */}
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <h1 className='text-gray-200 text-4xl mb-4'>JavaScript Quiz</h1>
            <h3 className='text-gray-200 text-xl mb-4 flex justify-between items-center'>
              <span>Question {parseInt(presentid) + 1} of {questions.length}</span>
              <span>Time remaining: {timer} seconds</span>
            </h3>
            {/* Question-Box */}
            <div className='bg-slate-200 p-2 my-10 rounded-md'>
              <h2 className='text-2xl'>{parseInt(presentid) + 1} - {presentQuestion}</h2>
              <div className='my-5'>
                {presentOptions?.map((opt, index) => {
                  return (
                    <label key={index} onClick={() => handleAnswer(index)} htmlFor={index} className="flex items-center space-x-2 p-2 bg-slate-700 text-white my-2 rounded-xl">
                      <input type="radio" id={index} name={index} checked={checked === index} onChange={(e) => setChecked(e.target.value)} className="form-radio h-5 w-5 text-blue-500" />
                      <span>{opt}</span>
                    </label>
                  )
                })}
              </div>
              <div className="flex justify-between items-center">
                <button disabled={parseInt(presentid) <= 0} onClick={handlePreviousQuiz} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded">&larr; Previous</button>
                <button onClick={handleNextQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{parseInt(presentid) + 1 !== questions.length ? "Next" : "Submit"} &rarr;</button>
              </div>
            </div>
            {/* Question-Box */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;