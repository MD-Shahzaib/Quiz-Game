import React from 'react'

const Question = ({ questions, presentid, presentQuestion, presentOptions, checked, setChecked, handleAnswer, handleNextQuiz, handlePreviousQuiz }) => {
    return (
        <div className='mt-10'>
            <h2 className='text-2xl font-semibold'>{parseInt(presentid) + 1} - {presentQuestion}</h2>
            <div className='my-5'>
                {presentOptions?.map((opt, index) => {
                    return (
                        <label
                            key={index + 1}
                            htmlFor={index + 1}
                            onClick={() => handleAnswer(index + 1)}
                            className="flex items-center space-x-2 p-2 bg-slate-700 hover:bg-slate-500 text-white my-2 rounded-md">
                            <input
                                type="radio"
                                id={index + 1}
                                checked={checked === index + 1}
                                onChange={(e) => setChecked(e.target.value)}
                                className="form-radio h-5 w-5 text-blue-500" />
                            <span className='font-medium'>{opt}</span>
                        </label>
                    )
                })}
            </div>
            <div className="flex justify-between items-center">
                <button disabled={parseInt(presentid) <= 0} onClick={handlePreviousQuiz} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded">&larr; Previous</button>
                <button disabled={!checked} onClick={handleNextQuiz} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded">{parseInt(presentid) + 1 !== questions.length ? "Next" : "Submit"} &rarr;</button>
            </div>
        </div>
    )
}

export default Question;