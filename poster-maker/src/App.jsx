import AddTextBox from "./components/AddTextBox";
import MovableTextBox from "./components/MovableTextBox";
import { useState } from 'react'

const App = () => {
  const [textBoxes, setTextBoxes] = useState([])
  //this one for handling selection 
  const handleSetTextBoxes = (index, newValues) => {
    const newTextBoxes = textBoxes.map((attributes, i) => 
      i === index ? newValues : [attributes[0], false, attributes[2]]
    );
    setTextBoxes(newTextBoxes);
  };
  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <div className="flex w-1/2 justify-center items-center">
        <div className="h-5/6 w-11/12 bg-white rounded-lg">
          {textBoxes.map((attributes, index) => (
            //attribute[0] is isDeleted, attribute[1] is isSelected, attribute[2] is text
            <div key={index} >
              <MovableTextBox isDeleted={attributes[0]}
                currentlySelected={attributes[1]}
                setSelectState={(newValues) => handleSetTextBoxes(index, newValues)}
                startingText={attributes[2]}
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
