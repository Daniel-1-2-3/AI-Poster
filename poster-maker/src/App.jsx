import AddTextBox from "./components/AddTextBox";
import MovableTextBox from "./components/MovableTextBox";
import { useState, useRef } from 'react'

const App = () => {
  const [textBoxes, setTextBoxes] = useState([])
  const canvasRef = useRef(null)

  //this one for handling selection 
  const handleSetTextBoxes = (index, newState) => {
    setTextBoxes(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = newState;
        return updatedState;
    });
};
  
  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <div className="flex w-1/2 justify-center items-center">
        <div className="h-5/6 w-11/12 bg-white rounded-lg" ref={canvasRef}>
          {textBoxes.map((attributes, index) => (
            //attribute[0] is isDeleted, attribute[1] is isSelected, attribute[2] is text, [3] is textSize, [4] is textColor, [5] is bgColor
            <div key={index} >
              <MovableTextBox isDeleted={attributes[0]}
                currentlySelected={attributes[1]}
                setSelectState={(newValues) => handleSetTextBoxes(index, newValues)}
                startingText={attributes[2]} textSize={attributes[3]} textColor={attributes[4]}
                bgColor={attributes[5]} startingCanvasRef={canvasRef.current}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-white overflow-y-scroll">
        <AddTextBox textBoxes={textBoxes} setTextBoxes={setTextBoxes}/>
      </div>
    </div>
  );
};

export default App;
