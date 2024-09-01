import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { generate } from './generate';
import { getLinks } from './getLinks';

const AddTextBox = ({ textBoxes, setTextBoxes }) => {
  const [showFunctions, setShowFunctions] = useState(false);
  const [GPTPrompts, setGPTPrompts] = useState([]);
  const [links, setLinks] = useState([]);
  const [textSizes, setTextSizes] = useState([]);
  const [bgColors, setBgColors] = useState([]);
  const [textColors, setTextColors] = useState([]);

  const expandTextBox = () => {
    setShowFunctions(!showFunctions);
  };

  const addTextBox = () => {
    const isDeleted = false;
    const isSelected = false;
    const text = '';
    const textSize = 16;
    const textColor = '#171717';
    const bgColor = '#e1fcdc';

    // Update local state arrays
    setTextSizes([...textSizes, textSize]);
    setTextColors([...textColors, textColor]);
    setBgColors([...bgColors, bgColor]);

    // Update textBoxes state
    setTextBoxes([...textBoxes, [isDeleted, isSelected, text, textSize, textColor, bgColor]]);
    setShowFunctions(true);

    setGPTPrompts([...GPTPrompts, ''])
    setLinks([...links, []])
  };

  const deleteTextBox = (idx) => {
    const newTextBoxesList = [...textBoxes];
    newTextBoxesList[idx] = [true, textBoxes[idx][1], '', 0, '', ''];
    setTextBoxes(newTextBoxesList);
  };

  const generateText = async (idx) => {
    console.log(GPTPrompts[idx])
    const generatedLinks = await getLinks(GPTPrompts[idx])
    const newLinks = [...links]
    newLinks[idx] = generatedLinks
    setLinks(newLinks)

    const generatedText = await generate(GPTPrompts[idx]);
    const newTextBoxesList = [...textBoxes];
    newTextBoxesList[idx] = [false, true, generatedText, textBoxes[idx][3], textBoxes[idx][4], textBoxes[idx][5]];
    setTextBoxes(newTextBoxesList);
  };

  const modifyGPTPrompts = (value, idx) => {
    const newGPTPrompts = [...GPTPrompts];
    newGPTPrompts[idx] = value;
    setGPTPrompts(newGPTPrompts);
  };

  const handleFontSizeChange = (idx, value) => {
    const size = parseInt(value, 10);
    if (!isNaN(size) && size >= 8) {
      const newTextBoxes = [...textBoxes];
      newTextBoxes[idx] = [newTextBoxes[idx][0], newTextBoxes[idx][1], newTextBoxes[idx][2], size, newTextBoxes[idx][4], newTextBoxes[idx][5]];
      setTextBoxes(newTextBoxes);

      setTextSizes(prevSizes => {
        const newSizes = [...prevSizes];
        newSizes[idx] = size;
        return newSizes;
      });
    }
  };

  const handleTextColorChange = (idx, color) => {
    const newTextBoxes = [...textBoxes];
    newTextBoxes[idx] = [newTextBoxes[idx][0], newTextBoxes[idx][1], newTextBoxes[idx][2], newTextBoxes[idx][3], color, newTextBoxes[idx][5]];
    setTextBoxes(newTextBoxes);

    setTextColors(prevColors => {
      const newColors = [...prevColors];
      newColors[idx] = color;
      return newColors;
    });
  };

  const handleBgColorChange = (idx, color) => {
    const newTextBoxes = [...textBoxes];
    newTextBoxes[idx] = [newTextBoxes[idx][0], newTextBoxes[idx][1], newTextBoxes[idx][2], newTextBoxes[idx][3], newTextBoxes[idx][4], color];
    setTextBoxes(newTextBoxes);

    setBgColors(prevColors => {
      const newColors = [...prevColors];
      newColors[idx] = color;
      return newColors;
    });
  };

  return (
    <div className="bg-white w-full text-center flex flex-col items-center justify-center">
      <div className="w-full bg-blue-200">
        <div className="flex border-b-4 border-gray-300 w-full items-center justify-center">
          {showFunctions ?
            <button onClick={expandTextBox}>
              <FontAwesomeIcon icon={faChevronUp} size="1x" className="text-gray-600 pr-4" />
            </button>
            :
            <button onClick={expandTextBox}>
              <FontAwesomeIcon icon={faChevronDown} size="1x" className="text-gray-600 pr-4" />
            </button>
          }
          <button onClick={addTextBox}>
            <p className="font-bold p-4 bg-blue-200">Add Text Box</p>
          </button>
        </div>
      </div>
      <div className="w-full">
        {showFunctions &&
          <div className="w-full">
            {textBoxes.map((attributes, index) => (
              <div key={index}>
                <p>{attributes[1] ? 'selected' : 'deselected'}</p>
                {!attributes[0] &&
                  <>
                  {textBoxes[index][1] ?
                    <div className="m-2 border-b-2 w-full rounded-md py-2">
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex w-3/4">
                          <input
                            type="text"
                            id="prompt"
                            name="prompt"
                            className="active:bg-gray-300 focus:bg-gray-300 hover:bg-gray-300 shadow-sm rounded focus:outline-none bg-gray-200 w-full mt-2 p-3"
                            placeholder="Enter prompt to generate text"
                            required
                            value={GPTPrompts[index]}
                            onChange={(e) => modifyGPTPrompts(e.target.value, index)}
                          />
                          <div className="flex items-center ml-4 mt-2 bg-white border border-gray-300 rounded-md">
                            <input
                              type="number"
                              value={textSizes[index]}
                              onChange={(e) => handleFontSizeChange(index, e.target.value)}
                              min="8"
                              className="px-2 py-1 w-16 text-center"
                            />
                            <span className="px-2">px</span>
                          </div>
                        </div>
                        <div className="flex py-2 w-3/4 items-center ml-20">
                          <div className="flex items-center mr-4">
                            <input
                              type="color"
                              value={bgColors[index]}
                              onChange={(e) => handleBgColorChange(index, e.target.value)}
                              className="w-8 h-8 p-0 border-none mt-2"
                            />
                            <span className="ml-2 mt-2 mr-4">Background</span>
                          </div>
                          <div className="flex items-center mr-4">
                            <input
                              type="color"
                              value={textColors[index]}
                              onChange={(e) => handleTextColorChange(index, e.target.value)}
                              className="w-8 h-8 p-0 border-none mt-2"
                            />
                            <span className="ml-2 mt-2 mr-2">Text</span>
                          </div>
                          <button
                            className='font-mono font-semibold bg-green-300 px-9 py-2 mr-1 p-1 mt-2 rounded-md shadow-lg hover:bg-green-400'
                            onClick={() => generateText(index)}
                          >
                            Generate
                          </button>
                          <button
                            className="font-mono font-semibold bg-red-100 px-9 py-2 ml-4 mt-2 rounded-md shadow-lg hover:bg-red-200"
                            onClick={() => deleteTextBox(index)}
                          >
                            <p>Delete Box</p>
                          </button>
                        </div>
                        <div>
                          {(links[index].length > 0) &&
                            <ul>
                              <p>Links for further research</p>
                              {links[index].map((link, subIndex) => (
                                <li key={subIndex} >{link}</li>
                              ))}
                            </ul>
                          }
                        </div>
                      </div>
                    </div>
                    :
                    <div className="m-2 border-b-2 w-full rounded-md py-2">
                      empty
                    </div>
                  }
                  </>
                }
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

AddTextBox.propTypes = {
  textBoxes: PropTypes.array.isRequired,
  setTextBoxes: PropTypes.func.isRequired,
};

export default AddTextBox;
