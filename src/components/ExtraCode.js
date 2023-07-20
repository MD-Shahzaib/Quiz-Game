// APP.JS
/*
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import Timer from './components/Timer';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.log('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (selectedOption) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex], answer: selectedOption },
    ]);

    // (Debugging).
    if (currentQuestionIndex !== questions.length - 1) {
      return handleNextQuestion()
    } else {
      return handleQuizComplete()
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleQuizComplete = () => {
    const calculatedScore = userAnswers.reduce((acc, userAnswer) => {
      const correctAnswer = userAnswer.question.correct_answer;
      const userSelectedAnswer = userAnswer.answer;
      if (userSelectedAnswer === correctAnswer) {
        console.log("acc", acc);
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(calculatedScore);
    setQuizCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (quizCompleted) {
    return <Result score={score} />;
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
      <Timer time={100} onTimeout={handleNextQuestion} />
      <Question
        question={currentQuestion.question}
        options={[
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ]}
        onSelectOption={handleAnswerSelection}
      />
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-400"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={
            currentQuestionIndex === questions.length - 1
              ? handleQuizComplete
              : handleNextQuestion
          }
        >
          {currentQuestionIndex === questions.length - 1
            ? 'Finish'
            : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default App;
*/




// COMPONENTS/QUESTION.JS
/*
import React from 'react';

const Question = ({ question, options, onSelectOption }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">{question}</h2>
            <ul className="mt-4">
                {options.map((option) => (
                    <li
                        key={option}
                        className="my-2 cursor-pointer"
                        onClick={() => onSelectOption(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;

*/




// COMPONENTS/RESULT.JS
/*
import React from 'react';

const Result = ({ score }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Quiz Completed!</h2>
            <p className="mt-4">Your score: {score}</p>
        </div>
    );
};

export default Result;

*/




// COMPONENTS/TIMER.JS
/*
import React, { useEffect, useState } from 'react';

const Timer = ({ time, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(time);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(timer);
            onTimeout();
        }

        return () => clearInterval(timer);
    }, [remainingTime, onTimeout]);

    return <div>Time Remaining: {remainingTime}</div>;
};

export default Timer;
*/



// QUIZ.JS
/*
import React, { useEffect, useState } from 'react';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple'
            );
            const data = await response.json();
            setQuestions(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        if (timer === 0) {
            handleAnswer(null);
        }

        return () => clearInterval(countdown);
    }, [timer]);

    const handleAnswer = (selectedOption) => {
        setSelectedAnswer(selectedOption);

        const question = questions[currentQuestion];
        if (selectedOption === question.correct_answer) {
            setScore((prevScore) => prevScore + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                setTimer(10);
            }
        }, 1000);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
            setTimer(10);
        }
    };

    const renderResult = () => {
        return (
            <div>
                <h2>Quiz Completed!</h2>
                <p>Your Score: {score}/{questions.length}</p>
            </div>
        );
    };

    const renderQuestion = () => {
        const question = questions[currentQuestion];
        const options = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(options);

        return (
            <div>
                <h2>{question.question}</h2>
                <div>
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={selectedAnswer !== null}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 ${selectedAnswer === option ? 'bg-gray-700' : ''
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {currentQuestion > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        Previous
                    </button>
                )}
                <p>Time Remaining: {timer}</p>
            </div>
        );
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (currentQuestion < questions.length) {
        return (
            <div className="container mx-auto p-4">
                {renderQuestion()}
            </div>
        );
    } else {
        return (
            <div className="container mx-auto p-4">
                {renderResult()}
            </div>
        );
    }
};

// Utility function to shuffle array elements
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export default Quiz;
*/



// __________________________________________________________________________.


// Component/Question.js
/* 
import React from 'react';
function Question({ question }) {
return (
  <div><h2 className="text-2xl font-bold mb-4">{question.question}</h2></div>
 );
}
export default Question;
*/ 


// Component/Options.js
/*
import React from 'react';
function Options({ options, handleAnswer }) {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="option"
              value={index}
              onChange={handleAnswer}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
export default Options;
*/


// Component/Result.js
/*
import React from 'react';
function Result({ score, restartQuiz }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p>Your score: {score}</p>
      <button
        onClick={restartQuiz}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
}
export default Result;
*/


// Component/Quiz.js
/*
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import Options from './Options';
import Result from './Result';

function Quiz() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get('/data/questions.json')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswer = (event) => {
    const selectedOption = parseInt(event.target.value);
    const currentScore =
      selectedOption === questions[currentQuestion].answer ? 1 : 0;

    setScore(score + currentScore);
    setCurrentQuestion(currentQuestion + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  if (currentQuestion >= questions.length) {
    return <Result score={score} restartQuiz={restartQuiz} />;
  }

  return (
    <div>
      <Question question={questions[currentQuestion]} />
      <Options
        options={questions[currentQuestion].options}
        handleAnswer={handleAnswer}
      />
      <button
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Next
      </button>
    </div>
  );
}
export default Quiz;
*/


// App.js
/*
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Quiz} />
      </Switch>
    </Router>
  );
}
export default App;
*/







// __________________________________________________________________________.





/*
import React, { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    options: [
      { id: 1, answer: "<script src='script.js'>" },
      { id: 2, answer: "<script href='script.js'>" },
      { id: 3, answer: "<script ref='script.js'>" },
      { id: 4, answer: "<script name='script.js'>" },
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is NOT a valid JavaScript data type?",
    options: [
      { id: 1, answer: "String" },
      { id: 2, answer: "Boolean" },
      { id: 3, answer: "Float" },
      { id: 4, answer: "Object" },
    ],
    correctAnswer: 3,
  },
  {
    id: 3,
    question: "What does the 'typeof' operator in JavaScript return?",
    options: [
      { id: 1, answer: "The type of a variable" },
      { id: 2, answer: "The size of an array" },
      { id: 3, answer: "The length of a string" },
      { id: 4, answer: "The index of an element in an array" },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: [
      { id: 1, answer: "let" },
      { id: 2, answer: "var" },
      { id: 3, answer: "const" },
      { id: 4, answer: "constan" },
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What is the output of the following code?\n\nconsole.log(2 + '2');",
    options: [
      { id: 1, answer: "4" },
      { id: 2, answer: "22" },
      { id: 3, answer: "NaN" },
      { id: 4, answer: "undefined" },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: [
      { id: 1, answer: "push()" },
      { id: 2, answer: "pop()" },
      { id: 3, answer: "shift()" },
      { id: 4, answer: "unshift()" },
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What does the '===' operator in JavaScript compare?",
    options: [
      { id: 1, answer: "Values and types" },
      { id: 2, answer: "Values only" },
      { id: 3, answer: "Types only" },
      { id: 4, answer: "None of the above" },
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Which built-in method returns the index within the calling string object of the first occurrence of the specified value?",
    options: [
      { id: 1, answer: "indexOf()" },
      { id: 2, answer: "search()" },
      { id: 3, answer: "substr()" },
      { id: 4, answer: "charAt()" },
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Which JavaScript function is used to round a number to the nearest integer?",
    options: [
      { id: 1, answer: "Math.ceil()" },
      { id: 2, answer: "Math.floor()" },
      { id: 3, answer: "Math.round()" },
      { id: 4, answer: "Math.random()" },
    ],
    correctAnswer: 3,
  },
  {
    id: 10,
    question: "Which statement is used to exit a loop in JavaScript?",
    options: [
      { id: 1, answer: "break" },
      { id: 2, answer: "continue" },
      { id: 3, answer: "return" },
      { id: 4, answer: "exit" },
    ],
    correctAnswer: 1,
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);

  // Timer Function.
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => { clearInterval(interval) };
  }, []);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion - 1 >= 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      setTimer(10);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimer(10);
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option) => (
      <button
        key={option.id}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        onClick={() => handleAnswer(option.id)}
      >
        {option.answer}
      </button>
    ));
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      {showResult ? (
        <div>
          <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-2xl mb-2">Your score: {score}/{questions.length}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-4">Question {currentQuestion + 1}/{questions.length}</h1>
          <p className="text-2xl mb-2">{questions[currentQuestion].question}</p>
          <div className="mb-4">{renderOptions()}</div>
          <div className="flex justify-between">
            {currentQuestion !== 0 && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePreviousQuestion}>Previous</button>
            )}
            <p className="text-xl">Time left: {timer}s</p>
            {currentQuestion !== questions.length - 1 && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
*/





