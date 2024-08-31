import AddTextBox from "./components/AddTextBox";
import MovableTextBox from "./components/MovableTextBox";
import { useState } from 'react'

const App = () => {
  const [textBoxes, setTextBoxes] = useState([])
  return (
    <div className="h-screen bg-gray-200 flex overflow-y-auto">
      <div className="flex flex-grow w-1/2 justify-center items-center">
        <div className="h-3/4 w-11/12 bg-white rounded-lg">
          {textBoxes.map((item, index) => (
            <div
              key={index}
            >
              <MovableTextBox />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-grow w-1/2 bg-white">
        <AddTextBox textBoxes={textBoxes} setTextBoxes={setTextBoxes}/>
      </div>
    </div>
  );
};

export default App;
