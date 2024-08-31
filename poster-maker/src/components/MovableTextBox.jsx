import { useState, useRef, useEffect } from 'react';

const MovableTextBox = () => {
    const [isTyping, setIsTyping] = useState(false)
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [text, setText] = useState('');
    const [position, setPosition] = useState({ x: 29, y: 62 });
    const [dimensions, setDimensions] = useState({ width: 200, height: 'auto' }); // Change initial height to 'auto'
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
                    left: 29,
                    top: 62,
                    right: 665 - boxRef.current.offsetWidth, // Adjust according to box width
                    bottom: 675 - boxRef.current.offsetHeight // Adjust according to box height
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
            setIsTyping(false)
            setIsResizing(true);
            startSize.current = {
                width: boxRef.current.offsetWidth,
                height: boxRef.current.offsetHeight,
            };
        } else if (e.target.tagName === 'P') {
            // Avoid setting dragging for text editing
            e.stopPropagation();
            setIsTyping(true)
        } else {
            setIsTyping(false)
            setIsDragging(true);
            startOffset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
        e.preventDefault();
    };

    useEffect(() => {
        // Focus on the input component so that it can be edited
        if (textRef.current) {
            textRef.current.focus();
        }
        setIsTyping(false);
    }, [isTyping]);

    const handleInput = (e) => {
        setText(e.target.innerText); // Update the text state

        // Automatically adjust box height based on text content
        if (textRef.current && boxRef.current) {
            if (textRef.current.scrollHeight + 60 > boxRef.current.offsetWidth){
                const newHeight = textRef.current.scrollHeight + 25 ; // Add some padding
                setDimensions(prev => ({ ...prev, height: newHeight }));
            }
        }

        // Move cursor to the end of the text
        const selection = window.getSelection();
        const range = document.createRange();
        const p = e.target;

        range.selectNodeContents(p);
        range.collapse(false); // Move cursor to the end
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const moveCursor = (e) => {
        // Move cursor to the end of the text
        const selection = window.getSelection();
        const range = document.createRange();
        const p = e.target;

        range.selectNodeContents(p);
        range.collapse(false); // Move cursor to the end
        selection.removeAllRanges();
        selection.addRange(range);
    }

    return (
        <div
            ref={boxRef}
            className="absolute p-3 bg-teal-200 text-gray-950 flex items-center justify-center cursor-pointer rounded-md z-10"
            style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${dimensions.width}px`, height: dimensions.height }}
            onMouseDown={handleMouseDown}
        >
            <p
                ref={textRef}
                className="w-full h-full mx-2 border-2 border-transparent rounded-s-sm focus:outline-none hover:border-gray-100 focus:border-gray-100 cursor-text"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onClick={moveCursor}
            >
                {text}
            </p>
            {/* Resize Handle */}
            <div className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize border-b-4 border-b-transparent border-r-4 border-r-transparent
            hover:border-b-gray-400 active:border-b-gray-400 rounded-br-md hover:border-r-gray-400 active:border-r-gray-400"></div>
        </div>
    );
};

export default MovableTextBox;
