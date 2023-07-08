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
