import React from 'react'
// ICONS.
import { MdSunny, MdDarkMode } from 'react-icons/md';

const Navbar = ({ darkMode, setDarkMode }) => {
    const handleToggleDarkMode = () => setDarkMode(!darkMode);
    return (
        <header className={`${darkMode ? 'text-gray-400 bg-gray-900' : 'bg-white text-gray-600'} body-font sticky top-0`}>
            <div className="container mx-auto flex flex-wrap p-5 items-center justify-between max-[500px]:justify-center max-[500px]:flex-col">
                <div className={`flex title-font font-medium items-center ${darkMode ? 'text-white' : 'text-gray-900'} cursor-pointer`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span className="ml-3 text-xl">Quiz Game</span>
                </div>
                <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} max-[500px]:my-4`}>JavaScript Quiz</h1>
                <button className={`inline-flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} border-0 py-1.5 px-3 focus:outline-none rounded text-base font-semibold`} onClick={handleToggleDarkMode}>
                    Theme {darkMode ? <MdSunny className='text-2xl ml-0.5' /> : <MdDarkMode className='text-2xl ml-0.5' />}
                </button>
            </div>
        </header>
    )
}

export default Navbar;