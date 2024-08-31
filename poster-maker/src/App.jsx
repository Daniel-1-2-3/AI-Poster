import AddTextBox from "./components/AddTextBox";
import MovableTextBox from "./components/MovableTextBox";
import { useState } from 'react'

const App = () => {
  const [textBoxes, setTextBoxes] = useState([])
  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <div className="flex w-1/2 justify-center items-center">
        <div className="h-5/6 w-11/12 bg-white rounded-lg">
          {textBoxes.map((attributes, index) => (
            <div key={index} >
              <MovableTextBox isDeleted={attributes[0]} textBoxes={textBoxes} setTextBoxes={setTextBoxes} index={index}/>
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
