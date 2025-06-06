import React from 'react'
import PropTypes from 'prop-types'
import ApperIcon from '@/components/ApperIcon'

const IconButton = ({ iconName, size, className, onClick, ...props }) => {
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
  onClick: PropTypes.func
}

IconButton.defaultProps = {
  size: 20,
  className: 'text-surface-400 hover:text-white',
  onClick: () => {}
}

export default IconButton