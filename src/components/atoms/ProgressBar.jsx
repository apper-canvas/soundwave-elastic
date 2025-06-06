import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({ value, max = 100, onChange = () => {}, className = '' }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10)
    onChange(newValue)
  }

  const clampedValue = Math.min(Math.max(value || 0, 0), max)

  return (
    <input
      type="range"
      min="0"
      max={max}
      value={clampedValue}
      onChange={handleChange}
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

export default ProgressBar