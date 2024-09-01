import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovableImage = ({ image }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [dimensions, setDimensions] = useState({ width: 200, height: 150 });
    const [aspectRatio, setAspectRatio] = useState(4 / 3); // Default aspect ratio
    const startOffset = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: 0, height: 0 });
    const boxRef = useRef(null);
    const imageRef = useRef(null);

    // Minimum and maximum dimensions for resizing
    const minSize = { width: 50, height: 50 };
    const maxSize = { width: 636, height: 614 };

    useEffect(() => {
        const img = imageRef.current;
        if (img) {
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            setAspectRatio(naturalWidth / naturalHeight);
        }
    }, [image]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - startOffset.current.x;
                const newY = e.clientY - startOffset.current.y;

                // Boundary limits for movement
                const boundary = {
                    left: 29,
                    top: 62,
                    right: 665 - boxRef.current.offsetWidth,
                    bottom: 675 - boxRef.current.offsetHeight
                };

                // Restrict movement within boundary
                const boundedX = Math.max(boundary.left, Math.min(newX, boundary.right));
                const boundedY = Math.max(boundary.top, Math.min(newY, boundary.bottom));

                setPosition({ x: boundedX, y: boundedY });

            } else if (isResizing) {
                const boxRect = boxRef.current.getBoundingClientRect();
                const mouseX = e.clientX - boxRect.left;
                const mouseY = e.clientY - boxRect.top;

                let newWidth = Math.max(
                    Math.min(mouseX, maxSize.width),
                    minSize.width
                );
                let newHeight = Math.max(
                    Math.min(mouseY, maxSize.height),
                    minSize.height
                );

                // Maintain aspect ratio
                if (newWidth / newHeight > aspectRatio) {
                    newWidth = newHeight * aspectRatio;
                } else {
                    newHeight = newWidth / aspectRatio;
                }

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

    }, [isDragging, isResizing, aspectRatio]);

    const handleMouseDown = (e) => {
        if (e.target.classList.contains('resize-handle')) {
            setIsResizing(true);
            startSize.current = {
                width: boxRef.current.offsetWidth,
                height: boxRef.current.offsetHeight,
            };
        } else {
            setIsDragging(true);
            startOffset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
        e.preventDefault();
    };

    return (
        <div
            ref={boxRef}
            className={'absolute text-gray-950 border-transparent items-center justify-center cursor-pointer z-10 border-dashed border-2 focus:border-gray-500 active:border-gray-500'}
            style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
            onMouseDown={handleMouseDown}
        >
            <img
                ref={imageRef}
                src={image}
                alt="Movable"
                className="w-full h-full object-fill rounded-md"
            />
            <div className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize border-b-4 border-b-transparent border-r-4 border-r-transparent
              hover:border-b-gray-400 active:border-b-gray-400 rounded-br-md hover:border-r-gray-400 active:border-r-gray-400">
            </div>
        </div>
    );
};

MovableImage.propTypes = {
    image: PropTypes.string.isRequired,
};

export default MovableImage;
