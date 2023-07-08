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