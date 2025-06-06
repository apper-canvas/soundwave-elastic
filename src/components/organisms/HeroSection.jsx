import React from 'react'
import PropTypes from 'prop-types'
import Text from '@/components/atoms/Text'

const HeroSection = ({ title, subtitle, className }) => {
  return (
    <div className={`relative h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-end ${className}`}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 p-8">
        <Text variant="h1" className="mb-4">{title}</Text>
        <Text variant="xl" className="text-surface-200">{subtitle}</Text>
      </div>
    </div>
  )
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  className: PropTypes.string
}

HeroSection.defaultProps = {
  className: ''
}

export default HeroSection