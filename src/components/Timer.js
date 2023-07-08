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
