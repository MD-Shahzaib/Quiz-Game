import React from 'react'

const Result = ({ score, questions, handleRestartQuiz }) => {
    const performance = (score / questions.length * 100);
    return (
        <div className='container mx-auto p-4'>
            <div className='bg-slate-200 p-5 my-10 rounded-md flex flex-col justify-center items-center'>
                <h1 className="text-4xl text-center font-semibold">Quiz Complete!</h1>
                <p className={`text-4xl my-4 font-semibold ${performance >= 50 ? "text-green-800" : "text-red-500"}`}>{performance >= 50 ? "Success" : "Failed"}: {performance}%</p>
                <p className="text-xl mb-4">Your score <span className='font-semibold'>{score}</span> out of <span className='font-semibold'>{questions.length}</span></p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded" onClick={handleRestartQuiz}>Restart Quiz &#8635;</button>
            </div>
        </div>
    )
}

export default Result;