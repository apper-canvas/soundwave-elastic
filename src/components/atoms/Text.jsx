import React from 'react'
import PropTypes from 'prop-types'

const Text = ({ children, variant, className, ...props }) => {
  const Tag = variant

  const baseClasses = 'text-white'
  const variantClasses = {
    h1: 'text-4xl md:text-6xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-bold',
    h4: 'font-semibold',
    p: 'text-base',
    span: 'text-sm',
    small: 'text-xs text-surface-400'
  }

  return (
    <Tag className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'small']),
  className: PropTypes.string
}

Text.defaultProps = {
  variant: 'p',
  className: ''
}

export default Text