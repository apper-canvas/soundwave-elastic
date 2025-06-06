import React from 'react'
import PropTypes from 'prop-types'

const RangeSlider = ({ 
  value, 
  min = 0, 
  max = 100, 
  onChange = () => {}, 
  className = '', 
  ...props 
}) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value || min}
      onChange={handleChange}
      className={`h-1 bg-surface-600 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary ${className}`}
      {...props}
    />
  )
}

RangeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string
}

export default RangeSlider