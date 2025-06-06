import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ type, placeholder, value, onChange, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-surface-800 border border-surface-600 rounded-full py-3 px-4 text-white placeholder-surface-400 focus:outline-none focus:border-primary ${className}`}
      {...props}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  value: undefined,
  onChange: () => {},
  className: ''
}

export default Input