import React from 'react'
import PropTypes from 'prop-types'

const Text = ({ children, variant = 'p', className = '', ...props }) => {
  const elementMap = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    h4: 'h4',
    xl: 'p',
    p: 'p',
    span: 'span',
    small: 'small'
  }
  
  const Tag = elementMap[variant] || 'p'
  const baseClasses = 'text-white'
  const variantClasses = {
    h1: 'text-4xl md:text-6xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-bold',
    h4: 'font-semibold',
    xl: 'text-lg font-medium',
    p: 'text-base',
    span: 'text-sm',
    small: 'text-xs text-surface-400'
  }
return (
    <Tag className={`${baseClasses} ${variantClasses[variant] || variantClasses.p} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'xl', 'p', 'span', 'small']),
  className: PropTypes.string
}

export default Text