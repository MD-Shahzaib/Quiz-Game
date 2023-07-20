import React, { useEffect, useState } from 'react';
import Questions from './components/data/questions.json'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    setQuestions(Questions)
  }, [])

  // TIMER FUNCTION.
  const [timer, setTimer] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => { clearInterval(interval) };
  }, []);

  // CLOCK FUNCTION FOR (Vanila-JS)
  /*
  function startClock(displayElement) {
    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      displayElement.textContent = time;
    }
    // Update the clock immediately
    updateClock();
    // Update the clock every second
    setInterval(updateClock, 1000);
  }
  // Example usage:
  const displayElement = document.getElementById("clock"); // Element to display the clock
  startClock(displayElement);
  */

  // CLOCK FUNCTION FOR (REACT)
  /*
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}:${seconds}`;
      setTime(currentTime);
    };
    // Update the clock immediately
    updateClock();
    // Update the clock every second
    const intervalId = setInterval(updateClock, 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  */

  return (
    <>
      <Navbar />
      <div className="bg-slate-600">
        <div className="container mx-auto p-4">
          <h1 className='text-gray-200 text-4xl mb-4'>JavaScript Quiz</h1>
          <h3 className='text-gray-200 text-xl mb-4 flex justify-between items-center'>
            <span>Question 1 of {questions.length}</span>
            <span>Time remaining: {timer} seconds</span>
          </h3>
          {questions?.map((item) => {
            return (
              <div key={item.id} className='bg-slate-200 p-2 my-2 rounded-md'>
                <h2 className='text-2xl' >{parseInt(item.id) + 1} - {item.question}</h2>
                <ul className='my-5'>
                  {item.options.map((opt, index) => {
                    return (
                      <label
                        key={index}
                        htmlFor={opt}
                        className="flex items-center space-x-2 p-2 bg-slate-700 text-white my-2 rounded-xl"
                      >
                        <input
                          type="radio"
                          name="option"
                          id={opt}
                          value={opt}
                          className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span>{opt}</span>
                      </label>
                    )
                  })}
                </ul>
                <div className="flex justify-between items-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">&larr; Previous</button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next &rarr;</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;