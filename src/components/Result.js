import React from 'react'

const Result = ({ score, questions, handleRestartQuiz }) => {
    return (
        <div className='container mx-auto p-4'>
            {/* Result-Box */}
            <div className='bg-slate-200 p-5 my-10 rounded-md flex flex-col justify-center items-center'>
                <h1 className="text-4xl text-center font-semibold">Quiz Complete!</h1>
                <p className="text-2xl my-4">Your score: {score}/{questions.length}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRestartQuiz}>Restart Quiz &#8635;</button>
            </div>
            {/* Result-Box */}
        </div>
    )
}

export default Result;