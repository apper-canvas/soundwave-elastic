import React from 'react'
import PropTypes from 'prop-types'
import MediaObject from '@/components/molecules/MediaObject'
import Text from '@/components/atoms/Text'

const RecentTracksSection = ({ tracks, currentTrack, isPlaying, onTrackClick, title }) => {
  return (
    <div className="p-6">
      {title && <Text variant="h2" className="mb-6">{title}</Text>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tracks?.map((track) => (
          <MediaObject
            key={track?.id}
            imageUrl={track?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80'}
            title={track?.title || 'Unknown Track'}
            subtitle={track?.artist || 'Unknown Artist'}
            onClick={() => onTrackClick(track)}
            onPlayPauseClick={() => onTrackClick(track)}
            isPlaying={isPlaying}
            isActive={currentTrack?.id === track?.id}
          />
        ))}
      </div>
    </div>
  )
}

RecentTracksSection.propTypes = {
  tracks: PropTypes.array.isRequired,
  currentTrack: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  onTrackClick: PropTypes.func.isRequired,
  title: PropTypes.string
}

RecentTracksSection.defaultProps = {
  currentTrack: null,
  title: ''
}

export default RecentTracksSection