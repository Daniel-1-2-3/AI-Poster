import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddImageBox = ({ images, setImages }) => {
  const [showFunctions, setShowFunctions] = useState(false);
  const [imgPrompts, setImgPrompts] = useState([]);

  const expandImageBox = () => {
    setShowFunctions(!showFunctions);
  };

  const addImageBox = () => {
    const isDeleted = false;
    const isSelected = true; // change to false later
    const onCanvas = false;
    setImages([
      ...images,
      [isDeleted, isSelected, [[null, onCanvas], [null, onCanvas], [null, onCanvas], [null, onCanvas], [null, onCanvas]]],
    ]);
    setShowFunctions(true);
    setImgPrompts([...imgPrompts, '']);
  };

  const deleteImageBox = (idx) => {
    const newImages = [...images];
    const onCanvas = false;
    newImages[idx] = [true, false, [[null, onCanvas], [null, onCanvas], [null, onCanvas], [null, onCanvas], [null, onCanvas]]];
    setImages(newImages);
  };

  const setCanvasState = (index, subindex) => {
    const newImages = [...images];
    const imgsList = [...newImages[index][2]];
    imgsList[subindex] = [imgsList[subindex][0], true];
    newImages[index][2] = imgsList;
    setImages(newImages);
  };

  const generateImg = async (idx) => {
    const apiKey = 'VDuzvJ5vyuXWP3mBIR_HznhxpdQPESpdwZjuAJHtf4I'; // Replace with your Unsplash API key
    const numImages = 5; // Number of images to fetch

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: imgPrompts[idx],
          per_page: numImages,
          client_id: apiKey,
        },
      });

      const list = response.data.results.map((item) => item.urls.regular);
      const newImages = [...images];
      const onCanvas = false;
      newImages[idx] = [
        images[idx][0],
        images[idx][1],
        [[list[0], onCanvas], [list[1], onCanvas], [list[2], onCanvas], [list[3], onCanvas], [list[4], onCanvas]],
      ];
      setImages(newImages);
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
    }
  };

  const modifyImgPrompts = (value, idx) => {
    const newImgPrompts = [...imgPrompts];
    newImgPrompts[idx] = value;
    setImgPrompts(newImgPrompts);
  };

  return (
    <div className="bg-white w-full text-center flex flex-col items-center justify-center">
      <div className="w-full flex flex-col bg-blue-200">
        <div className="flex border-b-4 border-gray-300 w-full items-center justify-center">
          <button onClick={expandImageBox}>
            <FontAwesomeIcon
              icon={showFunctions ? faChevronUp : faChevronDown}
              size="1x"
              className="text-gray-600 pr-4"
            />
          </button>
          <button onClick={addImageBox}>
            <p className="font-bold p-4 bg-blue-200">Add Image Box</p>
          </button>
        </div>
      </div>
      {showFunctions && (
        <div className="w-full overflow-x-hidden">
          {images.map((attributes, index) => (
            <div key={index} className="mb-4">
              {!attributes[0] && (
                <>
                  {attributes[1] ? (
                    <div>
                      <div className="flex m-2 border-b-2 w-full rounded-md py-2 justify-center px-4">
                        <div className="flex w-full max-w-4xl justify-center">
                          <input
                            type="text"
                            id="prompt"
                            name="prompt"
                            className="active:bg-gray-300 focus:bg-gray-300 hover:bg-gray-300 shadow-sm rounded focus:outline-none bg-gray-200 w-full mt-2 p-3"
                            placeholder="Enter prompt to generate text"
                            required
                            value={imgPrompts[index]}
                            onChange={(e) => modifyImgPrompts(e.target.value, index)}
                          />
                          <button
                            className="font-mono font-semibold bg-green-300 px-4 ml-2 py-2 mt-2 rounded-md shadow-lg hover:bg-green-400"
                            onClick={() => generateImg(index)}
                          >
                            Search
                          </button>
                        </div>
                        <button
                          className="font-mono font-semibold bg-red-100 px-4 py-2 ml-2 mt-2 rounded-md shadow-lg hover:bg-red-200"
                          onClick={() => deleteImageBox(index)}
                        >
                          Delete Image
                        </button>
                      </div>
                      <div className="flex overflow-x-auto">
                        {attributes[2].map((contents, subindex) => (
                          <div key={subindex} className="flex-shrink-0 mx-2">
                            <button onClick={() => setCanvasState(index, subindex)}>
                              {(contents[0]) &&
                              <img
                                src={contents[0]}
                                className="max-w-xs h-auto"
                              />
                              }
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="m-2 border-b-2 w-full rounded-md py-2">
                      <p>empty</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

AddImageBox.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default AddImageBox;
