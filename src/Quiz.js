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
