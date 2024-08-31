import { useState, useRef, useEffect } from 'react';

const MovableTextBox = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [text, setText] = useState('heii');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 200, height: 50 });
    const startOffset = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: 0, height: 0 });
    const boxRef = useRef(null);
    const textRef = useRef(null);
    
    // Minimum and maximum dimensions for resizing
    const minSize = { width: 50, height: 50 };
    const maxSize = { width: 636, height: 614 };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - startOffset.current.x;
                const newY = e.clientY - startOffset.current.y;

                // Boundary limits for movement
                const boundary = {
                    left: 0,
                    top: 0,
                    right: 636 - dimensions.width, // Adjust according to box width
                    bottom: 614 - dimensions.height // Adjust according to box height
                };

                // Restrict movement within boundary
                const boundedX = Math.max(boundary.left, Math.min(newX, boundary.right));
                const boundedY = Math.max(boundary.top, Math.min(newY, boundary.bottom));
                
                setPosition({ x: boundedX, y: boundedY });
                
            } else if (isResizing) {
                const newWidth = Math.max(
                    Math.min(e.clientX - boxRef.current.getBoundingClientRect().left, maxSize.width),
                    minSize.width
                );
                const newHeight = Math.max(
                    Math.min(e.clientY - boxRef.current.getBoundingClientRect().top, maxSize.height),
                    minSize.height
                );
                
                setDimensions({ width: newWidth, height: newHeight });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    const handleMouseDown = (e) => {
        if (e.target.classList.contains('resize-handle')) {
            setIsResizing(true);
            startSize.current = {
                width: dimensions.width,
                height: dimensions.height,
            };
        } else if (e.target.tagName === 'P') {
            // Avoid setting dragging for text editing
            e.stopPropagation();
        } else{
            setIsDragging(true);
            startOffset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
        e.preventDefault();
    };

    const handleInput = (e) => {
        setText(e.target.innerText); // Update the text state
    };

    return (
        <div
            ref={boxRef}
            className="relative p-2 bg-blue-400 text-white flex items-center justify-center cursor-pointer rounded-md"
            style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
            onMouseDown={handleMouseDown}
        >
            <p 
                className="mt-3"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}

            >
                {text}
            </p>
            {/* Resize Handle */}
            <div className="resize-handle absolute bottom-0 right-0 w-5 h-5 bg-transparent hover:bg-gray-500 active:bg-gray-500 cursor-se-resize rounded-tl-2xl rounded-br-lg opacity-50"></div>
        </div>
    );
};

export default MovableTextBox;
