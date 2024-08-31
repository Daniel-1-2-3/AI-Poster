import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import { generate } from './generate';

const AddTextBox = ({textBoxes, setTextBoxes}) => {
  const [showFunctions, setShowFunctions] = useState(false)
  const [GPTPrompts, setGPTPrompts] = useState([])

  const expandTextBox = () => {
    const show = showFunctions
    setShowFunctions(!show)
    console.log(show)
  }

  const addTextBox = () => {
    const isDeleted = false
    const isSelected = true
    const text = ''
    setTextBoxes([...textBoxes, [isDeleted, isSelected, text]]);
    const newPrompts = [...GPTPrompts]
    newPrompts.push('')
    setGPTPrompts(newPrompts)
    setShowFunctions(true)
  }
  const deleteTextBox = (idx) => {
    const newTextBoxesList = [...textBoxes]
    newTextBoxesList[idx] = [true, textBoxes[idx][1], '']
    setTextBoxes(newTextBoxesList)
  }

  const generateText = (idx) => {
    const generatedText = generate(GPTPrompts[idx])
    console.log(generatedText)  
    const newTextBoxesList = [...textBoxes]
    newTextBoxesList[idx] = [false, textBoxes[idx][1], generatedText]
    setTextBoxes(newTextBoxesList)
  }

  const modifyGPTPrompts = (value, idx) => {
    const newGPTPrompts = [...GPTPrompts]
    newGPTPrompts[idx] = value
    setGPTPrompts(newGPTPrompts)
  }

  return (
    <div className="bg-blue-200 w-full text-center flex flex-col items-center justify-center">
      <div className="flex border-b-4 w-full items-center justify-center">
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
          <p className="font-bold p-4">Add Text Box</p>
        </button>
      </div>
      <div className="w-full">
        {showFunctions &&
          //attribute[0] is isDeleted, attribute[1] is isSelected, attribute[2] is text
          <div className="w-full">
            {textBoxes.map((attributes, index) => (
              <div key={index} >
                {!attributes[0] &&
                <div className="border-b-4 border-y-gray-200 w-full bg-gray-100">
                
                  <p>{attributes[1]}</p>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex w-3/4">
                      <input
                        type="text"
                        id="prompt"
                        name="prompt"
                        className="active:bg-gray-300 focus:bg-gray-300hover:bg-gray-300 shadow-sm rounded focus:outline-none bg-gray-200 w-full mt-2 p-3"
                        placeholder="Enter prompt to generate text"
                        required
                        value={GPTPrompts[index]}
                        onChange={(e) => modifyGPTPrompts(e.target.value, index)}
                      />
                    </div>
                    <div className="flex py-1 w-3/4">
                      <button className='font-mono font-semibold bg-green-300 w-3/4 mr-1 p-1 rounded-md shadow-lg hover:bg-green-400' onClick={() => generateText(index)}>
                        Generate
                      </button>

                      <button className="font-mono font-semibold bg-red-100 w-3/4 rounded-md shadow-lg hover:bg-red-200" onClick={() => deleteTextBox(index)}>
                        <p>Delete Box</p>
                        <p>{attributes[1]}</p>
                      </button>
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
  )
}

AddTextBox.propTypes = {
  textBoxes: PropTypes.array.isRequired,
  setTextBoxes: PropTypes.func.isRequired,
}

export default AddTextBox
