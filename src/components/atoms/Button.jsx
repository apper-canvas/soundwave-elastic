import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, className, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  className: 'text-white bg-gradient-to-br from-primary to-accent hover:from-primary-dark hover:to-accent-dark',
  onClick: () => {}
}

export default Button