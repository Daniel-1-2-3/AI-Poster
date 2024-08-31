import PropTypes from 'prop-types'

const Card = ({ children, bgColor = "bg-gray-100"}) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
        {children}
    </div>
  )
}

Card.propTypes = {
    children: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  };

export default Card
