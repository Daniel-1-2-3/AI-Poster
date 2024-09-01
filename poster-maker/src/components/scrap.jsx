import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { generate } from './generate';
import axios from 'axios';

const AddTextBox = ({ textBoxes, setTextBoxes }) => {
  const [showFunctions, setShowFunctions] = useState(false);
  const [GPTPrompts, setGPTPrompts] = useState([]);
  const [fontSizes, setFontSizes] = useState([]);
  const [bgColors, setBgColors] = useState([]);
  const [textColors, setTextColors] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Initialize fontSizes, bgColors, textColors, and imageUrls based on textBoxes
    setFontSizes(textBoxes.map(() => 16));
    setBgColors(textBoxes.map(() => '#ffffff'));
    setTextColors(textBoxes.map(() => '#000000'));
    setImageUrls(textBoxes.map(() => []));
  }, [textBoxes]);

  const expandTextBox = () => {
    setShowFunctions(!showFunctions);
  };

  const addTextBox = () => {
    const isDeleted = false;
    const isSelected = true;
    const text = '';
    setTextBoxes([...textBoxes, [isDeleted, isSelected, text]]);
    setGPTPrompts([...GPTPrompts, '']);
    setFontSizes([...fontSizes, 16]); // Add default font size
    setBgColors([...bgColors, '#ffffff']); // Add default background color
    setTextColors([...textColors, '#000000']); // Add default text color
    setImageUrls([...imageUrls, []]); // Add default empty image URLs
    setShowFunctions(true);
  };

  const deleteTextBox = (idx) => {
    const newTextBoxesList = [...textBoxes];
    newTextBoxesList[idx] = [true, textBoxes[idx][1], ''];
    setTextBoxes(newTextBoxesList);
  };

  const generateText = async (idx) => {
    const generatedText = await generate(GPTPrompts[idx]);
    const newTextBoxesList = [...textBoxes];
    newTextBoxesList[idx] = [false, textBoxes[idx][1], generatedText];
    setTextBoxes(newTextBoxesList);

    const images = await fetchUnsplashImages(GPTPrompts[idx]);
    setImageUrls((prevImageUrls) => {
      const newImageUrls = [...prevImageUrls];
      newImageUrls[idx] = images;
      return newImageUrls;
    });
  };

  const modifyGPTPrompts = (value, idx) => {
    const newGPTPrompts = [...GPTPrompts];
    newGPTPrompts[idx] = value;
    setGPTPrompts(newGPTPrompts);
  };

  const handleFontSizeChange = (idx, value) => {
    const newFontSizes = [...fontSizes];
    const size = parseInt(value, 10);
    if (!isNaN(size) && size >= 8) {
      newFontSizes[idx] = size;
      setFontSizes(newFontSizes);
    }
  };

  const handleColorChange = (idx, colorType, color) => {
    const updateColors = colorType === 'bg' ? setBgColors : setTextColors;
    const newColors = [...(colorType === 'bg' ? bgColors : textColors)];
    newColors[idx] = color;
    updateColors(newColors);
  };

  const fetchUnsplashImages = async (query) => {
    const apiKey = 'VDuzvJ5vyuXWP3mBIR_HznhxpdQPESpdwZjuAJHtf4I'; // Replace with your Unsplash API key
    const numImages = 3; // Number of images to fetch

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          per_page: numImages,
          client_id: apiKey
        }
      });

      return response.data.results.map(item => item.urls.regular);
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
      return [];
    }
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
                {!attributes[0] &&
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
                            value={fontSizes[index]}
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
                            onChange={(e) => handleColorChange(index, 'bg', e.target.value)}
                            className="w-8 h-8 p-0 border-none mt-2"
                          />
                          <span className="ml-2 mt-2 mr-4">Background</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <input
                            type="color"
                            value={textColors[index]}
                            onChange={(e) => handleColorChange(index, 'text', e.target.value)}
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
                          <p>{attributes[1]}</p>
                        </button>
                      </div>
                      <div className="w-full mt-2 flex flex-wrap overflow-hidden mr-8 justify-center">
                        {imageUrls[index] && imageUrls[index].map((url, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={url}
                            alt={`Generated Image ${imgIdx + 1}`}
                            className="w-auto h-32 mt-2 ml-4"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
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