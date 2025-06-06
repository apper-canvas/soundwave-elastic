import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ children, className, ...props }) => {
  return (
    <span className={`text-surface-300 ${className}`} {...props}>
      {children}
    </span>
  )
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Label.defaultProps = {
  className: ''
}

export default Label