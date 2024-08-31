import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovableTextBox = ({ isDeleted, currentlySelected, setSelectState, startingText }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [selected, setSelected] = useState(currentlySelected);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [text, setText] = useState(startingText);
    const [position, setPosition] = useState({ x: 29, y: 62 });
    const [dimensions, setDimensions] = useState({ width: 200, height: 'auto' });
    const startOffset = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: 0, height: 0 });
    const boxRef = useRef(null);
    const textRef = useRef(null);

    const minSize = { width: 50, height: 50 };
    const maxSize = { width: 636, height: 614 };

    useEffect(() => {
        setText(startingText);
    }, [startingText]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - startOffset.current.x;
                const newY = e.clientY - startOffset.current.y;

                const boundary = {
                    left: 29,
                    top: 62,
                    right: window.innerWidth - boxRef.current.offsetWidth - 29,
                    bottom: window.innerHeight - boxRef.current.offsetHeight - 62
                };

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

        const handleClickOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target) && selected) {
                setSelected(false);
                setSelectState([isDeleted, false, text]);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDragging, isResizing, selected, isDeleted, text, setSelectState]);

    const handleMouseDown = (e) => {
        if (e.target.classList.contains('resize-handle')) {
            setIsTyping(false);
            setIsResizing(true);
            startSize.current = {
                width: boxRef.current.offsetWidth,
                height: boxRef.current.offsetHeight,
            };
        } else if (e.target.tagName === 'P') {
            e.stopPropagation();
            setIsTyping(true);
        } else {
            setIsTyping(false);
            setIsDragging(true);
            startOffset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
        const isSelected = true;
        setSelected(isSelected);
        setSelectState([isDeleted, isSelected, text]);
        e.preventDefault();
    };

    useEffect(() => {
        if (textRef.current && isTyping) {
            textRef.current.focus();
        }
    }, [isTyping]);

    const handleInput = (e) => {
        setText(e.target.innerText);

        if (textRef.current && boxRef.current) {
            if (textRef.current.scrollHeight + 60 > boxRef.current.offsetWidth) {
                const newHeight = textRef.current.scrollHeight + 25;
                setDimensions(prev => ({ ...prev, height: newHeight }));
            }
        }

        const selection = window.getSelection();
        const range = document.createRange();
        const p = e.target;

        range.selectNodeContents(p);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const moveCursor = (e) => {
        const selection = window.getSelection();
        const range = document.createRange();
        const p = e.target;

        range.selectNodeContents(p);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    if (isDeleted) return null;

    return (
        <div
            ref={boxRef}
            className={`absolute p-3 bg-teal-200 text-gray-950 flex items-center justify-center cursor-pointer rounded-md border-2
            ${selected ? 'border-dashed border-gray-500' : 'border-transparent'}`}
            style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
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
            <div className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize border-b-4 border-b-transparent border-r-4 border-r-transparent
            hover:border-b-gray-400 active:border-b-gray-400 rounded-br-md hover:border-r-gray-400 active:border-r-gray-400"></div>
        </div>
    );
};

MovableTextBox.propTypes = {
    isDeleted: PropTypes.bool.isRequired,
    currentlySelected: PropTypes.bool.isRequired,
    setSelectState: PropTypes.func.isRequired,
    startingText: PropTypes.string.isRequired,
};

export default MovableTextBox;
