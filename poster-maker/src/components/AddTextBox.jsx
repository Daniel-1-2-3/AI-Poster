import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

const AddTextBox = ({textBoxes, setTextBoxes}) => {
  const [showFunctions, setShowFunctions] = useState(false)

  const expandTextBox = () => {
    const show = showFunctions
    setShowFunctions(!show)
    console.log(show)
  }

  const addTextBox = () => {
    setTextBoxes([...textBoxes, null]);
  }

  return (
    <div className="bg-blue-200 w-full h-min text-center flex flex-col items-center p-4 justify-center">
      <div className="flex">
        <button onClick={expandTextBox}>
          <FontAwesomeIcon icon={faChevronDown} size="1x" className="text-gray-600 pr-4" />
        </button>
        <button onClick={addTextBox}>
          <p className="font-bold">Add Text Box</p>
        </button>
      </div>
      {showFunctions &&
        <>
          <div className="p-3"></div>
        </>
      }
    </div>
  )
}

AddTextBox.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTextBoxes: PropTypes.func.isRequired,
}

export default AddTextBox
