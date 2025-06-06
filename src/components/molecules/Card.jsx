import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Image from '@/components/atoms/Image'
import Text from '@/components/atoms/Text'
import IconButton from '@/components/atoms/IconButton'

const Card = ({
  imageUrl,
  title,
  subtitle,
  onClick = () => {},
  onPlayClick = () => {},
  imageAlt = 'Card image',
  className = '',
  showPlayButton = true
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-surface-800/30 backdrop-blur-sm p-4 rounded-lg cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="relative mb-4">
        <Image
          src={imageUrl}
          alt={imageAlt}
          className="w-full aspect-square object-cover rounded-lg"
        />
        {showPlayButton && (
          <IconButton
            iconName="Play"
            size={16}
            onClick={(e) => {
              e.stopPropagation()
              onPlayClick()
            }}
            className="absolute bottom-2 right-2 bg-primary rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-black fill-current"
          />
        )}
      </div>
      <Text variant="h4" className="truncate mb-1">{title}</Text>
      <Text variant="span" className="text-surface-400 line-clamp-2">{subtitle}</Text>
    </motion.div>
  )
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
  showPlayButton: PropTypes.bool
}

export default Card