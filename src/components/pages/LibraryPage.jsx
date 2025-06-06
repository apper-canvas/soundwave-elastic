import React from 'react'
import PropTypes from 'prop-types'
import PlaylistGrid from '@/components/organisms/PlaylistGrid'
import Text from '@/components/atoms/Text'

const LibraryPage = ({ playlists }) => {
  return (
    <div className="p-6">
      <Text variant="h1" className="mb-8">Your Library</Text>
      <PlaylistGrid playlists={playlists} />
    </div>
  )
}

LibraryPage.propTypes = {
  playlists: PropTypes.array.isRequired
}

export default LibraryPage