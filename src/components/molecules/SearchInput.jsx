import React from 'react'
import PropTypes from 'prop-types'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchInput = ({ placeholder, value, onChange, className }) => {
  return (
    <div className="relative">
      <ApperIcon name="Search" size={20} className="absolute left-3 top-3 text-surface-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`pl-10 pr-4 ${className}`}
      />
    </div>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: 'Search...',
  value: undefined,
  onChange: () => {},
  className: ''
}

export default SearchInput