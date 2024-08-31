import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

const AddTextBox = ({textBoxes, setTextBoxes}) => {
  const [showFunctions, setShowFunctions] = useState(false)
  const [GPTPrompt, setGPTPrompt] = useState('')

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
    setShowFunctions(true)
  }
  const deleteTextBox = (idx) => {
    const newTextBoxesList = [...textBoxes]
    newTextBoxesList[idx] = [true, textBoxes[idx][1], '']
    setTextBoxes(newTextBoxesList)
  }

  const generateText = (idx) => {
    const generatedText = 'This will be GPT generated text'
    const newTextBoxesList = [...textBoxes]
    newTextBoxesList[idx] = [false, textBoxes[idx][1], generatedText]
    setTextBoxes(newTextBoxesList)
  }

  return (
    <div className="bg-blue-200 w-full text-center flex flex-col items-center justify-center">
      <div className="flex">
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
                <div className="border-y-2 border-y-gray-200 w-full bg-white">
                
                  <p>{attributes[1]}</p>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex w-3/4">
                    <input
                      type="text"
                      id="prompt"
                      name="prompt"
                      className="border rounded w-full py-2 px-3 mb-2"
                      placeholder="Enter prompt to generate text"
                      required
                      value={GPTPrompt}
                      onChange={(e) => setGPTPrompt(e.target.value)}
                    />
                    </div>
                    <button className='bg-green-400 w-3/4' onClick={() => generateText(index)}>
                      Generate
                    </button>
                    
                    <button className="bg-red-100" onClick={() => deleteTextBox(index)}>
                      <p>Delete Box</p>
                      <p>{attributes[1]}</p>
                    </button>
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
