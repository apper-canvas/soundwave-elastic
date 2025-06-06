import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({ value, max, onChange, className }) => {
  return (
    <input
      type="range"
      min="0"
      max={max}
      value={value}
      onChange={onChange}
      className={`w-full h-1 bg-surface-600 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary ${className}`}
    />
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string
}

ProgressBar.defaultProps = {
  max: 100,
  onChange: () => {},
  className: ''
}

export default ProgressBar