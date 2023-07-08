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
