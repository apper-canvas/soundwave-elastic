import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Image from '../atoms/Image'
import Text from '../atoms/Text'
import IconButton from '../atoms/IconButton'
const MediaObject = ({
  imageUrl,
  title,
  subtitle,
  onClick = () => {},
  onPlayPauseClick = () => {},
  isPlaying = false,
  isActive = false,
  imageAlt = 'Media image',
  showPlayPauseButton = true,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-surface-800/50 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1 min-w-0">
        <Text variant="h4" className="truncate">{title}</Text>
        <Text variant="span" className="text-surface-400 truncate">{subtitle}</Text>
      </div>
      {showPlayPauseButton && (
        <IconButton
          iconName={isActive && isPlaying ? "Pause" : "Play"}
          size={20}
          onClick={(e) => {
            e.stopPropagation()
            onPlayPauseClick()
          }}
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </motion.div>
  )
}

MediaObject.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onPlayPauseClick: PropTypes.func,
  isPlaying: PropTypes.bool,
  isActive: PropTypes.bool,
  imageAlt: PropTypes.string,
  showPlayPauseButton: PropTypes.bool,
  className: PropTypes.string
}

export default MediaObject