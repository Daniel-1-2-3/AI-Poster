import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

const AddTextBox = ({textBoxes, setTextBoxes}) => {
  const [showFunctions, setShowFunctions] = useState(false)

  const expandTextBox = () => {
    const show = showFunctions
    setShowFunctions(!show)
    console.log(show)
  }

  const addTextBox = () => {
    const isDeleted = false
    const isSelected = true
    setTextBoxes([...textBoxes, [isDeleted, isSelected]]);
    setShowFunctions(true)
  }
  const deleteTextBox = (idx) => {
    console.log(idx)
    const newTextBoxesList = [...textBoxes]
    newTextBoxesList[idx] = [true, textBoxes[idx][1]]
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
          <div className="w-full">
            {textBoxes.map((attributes, index) => (
              <>
                {!attributes[0] &&
                <div key={index} className="border-y-2 border-y-gray-200 w-full bg-white">
                  <p>here the commands and stuff</p>
                  <button className="bg-red-100" onClick={() => deleteTextBox(index)}>
                      <p>Delete Box</p>
                      <p>{attributes[1]}</p>
                  </button>
                </div>
                }
              </>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

AddTextBox.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTextBoxes: PropTypes.func.isRequired,
}

export default AddTextBox
