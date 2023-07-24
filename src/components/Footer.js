import React from 'react'

const Footer = ({ darkMode }) => {
    return (
        <footer className={`${darkMode ? "text-gray-400 bg-gray-900 body-font" : "text-gray-600 bg-white"} shadow-md`}>
            <div className="container flex max-[500px]:flex-col items-center justify-center sm:justify-between p-5 mx-auto">
                <div className={`flex title-font font-medium cursor-pointer items-center md:justify-start justify-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span className="ml-3 text-xl">Quiz Game</span>
                </div>
                <p className={`text-sm font-semibold text-center max-[640px]:ml-5 max-[500px]:ml-0 max-[500px]:mt-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>© MD-Shahzaib — 2020 Quiz Game</p>
            </div>
        </footer>
    )
}

export default Footer;