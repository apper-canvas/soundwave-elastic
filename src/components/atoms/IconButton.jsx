import React from 'react'
import PropTypes from 'prop-types'
import ApperIcon from './ApperIcon'

const IconButton = ({ 
  iconName, 
  size = 20,
  className = 'text-surface-400 hover:text-white', 
  onClick = () => {}, 
  asIcon = false,
  ...props 
}) => {
  if (asIcon) {
    return (
      <span className={`flex items-center justify-center transition-colors ${className}`}>
        <ApperIcon name={iconName} size={size} />
      </span>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-colors ${className}`}
      {...props}
    >
      <ApperIcon name={iconName} size={size} />
    </button>
  )
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  asIcon: PropTypes.bool
}

export default IconButton