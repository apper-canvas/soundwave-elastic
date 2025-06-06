import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src, alt = 'Image', className = '', onError, onLoad, ...props }) => {
  if (!src) {
    return null
  }

  const handleError = (e) => {
    if (onError) {
      onError(e)
    }
  }

  const handleLoad = (e) => {
    if (onLoad) {
      onLoad(e)
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func
}

export default Image