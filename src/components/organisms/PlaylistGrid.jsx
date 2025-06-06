import React from 'react'
import PropTypes from 'prop-types'
import Card from '../molecules/Card'
import Text from '../atoms/Text'

const PlaylistGrid = ({ playlists, title = '', onPlaylistClick = () => {} }) => {
  return (
    <div className="p-6">
      {title && <Text variant="h2" className="mb-6">{title}</Text>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists?.map((playlist) => (
          <Card
            key={playlist?.id}
            imageUrl={playlist?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'}
            title={playlist?.name || 'Untitled Playlist'}
            subtitle={`${playlist?.tracks?.length || 0} songs`}
            onClick={() => onPlaylistClick(playlist)}
            showPlayButton={true}
          />
        ))}
      </div>
    </div>
  )
}

PlaylistGrid.propTypes = {
  playlists: PropTypes.array.isRequired,
  title: PropTypes.string,
  onPlaylistClick: PropTypes.func
}

export default PlaylistGrid