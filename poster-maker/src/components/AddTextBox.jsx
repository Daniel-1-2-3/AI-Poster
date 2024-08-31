import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AddTextBox = () => {
  const [showFunctions, setShowFunctions] = useState(false)

  const expandBox = () => {
    const show = showFunctions
    setShowFunctions(!show)
    console.log(show)
  }

  return (
    <div className="bg-blue-200 w-full h-min text-center flex flex-col items-center p-4 justify-center">
      <div className="flex">
        <button onClick={expandBox}>
          <FontAwesomeIcon icon={faChevronDown} size="1x" className="text-gray-600 pr-4" />
        </button>
        <p className="font-bold">Add Text Box</p>
      </div>
      {showFunctions &&
        <div className="p-3"></div>
      }
    </div>
  )
}

export default AddTextBox
