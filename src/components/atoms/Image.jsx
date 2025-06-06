import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      {...props}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string
}

Image.defaultProps = {
  alt: 'Image',
  className: ''
}

export default Image