import React, { useState, useEffect } from 'react';
import './blinking.css';

const TypingText = ({ text }) => {
    const [currentText, setCurrentText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (index === text.length) {
                clearInterval(timer);
                setShowCursor(false); // Hide the cursor when typing is done
            } else {
                setCurrentText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }
        }, 100); // Adjust the interval as needed

        return () => {
            clearInterval(timer);
        };
    }, [text, index]);

    return (
        <div className="typing-text">
            <span>{currentText}</span>
            {/* {(showCursor && <span className="cursor">|</span>) || (index === text.length)} */}
        </div>
    );
};

export default TypingText;
