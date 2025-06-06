import React from 'react'
import PropTypes from 'prop-types'
import Image from '@/components/atoms/Image'
import Text from '@/components/atoms/Text'
import IconButton from '@/components/atoms/IconButton'

const SongInfo = ({ imageUrl, title, artist, onLikeClick, imageAlt }) => {
  return (
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <Image
        src={imageUrl}
        alt={imageAlt}
        className="w-14 h-14 object-cover rounded"
      />
      <div className="min-w-0">
        <Text variant="h4" className="truncate">{title}</Text>
        <Text variant="span" className="text-surface-400 truncate">{artist}</Text>
      </div>
      <IconButton iconName="Heart" size={16} onClick={onLikeClick} />
    </div>
  )
}

SongInfo.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  onLikeClick: PropTypes.func,
  imageAlt: PropTypes.string
}

SongInfo.defaultProps = {
  onLikeClick: () => {},
  imageAlt: 'Track cover'
}

export default SongInfo