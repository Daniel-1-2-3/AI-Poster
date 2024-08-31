import React, { useState, useRef, useEffect } from 'react';

const MovableTextBox = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [text, setText] = useState('this is text sdfhbsbfdb')
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const boxRef = useRef(null);
    const startOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        startOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        e.preventDefault();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - startOffset.current.x;
            const newY = e.clientY - startOffset.current.y;

            if (newX > 30 && newX < window.innerWidth/2){
                setPosition({ x:newX, y:newY})
            }
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    });

    return (
        <div
            className="absolute p-2 w-32 bg-blue-500 text-white flex items-center justify-center cursor-pointer rounded-sm"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
        >
            <p className='text-white text-sm'>{text}</p>
        </div>
    );
};

export default MovableTextBox;
