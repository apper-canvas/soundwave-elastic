import React from 'react'
import PropTypes from 'prop-types'
import Text from '@/components/atoms/Text'
import SearchInput from '@/components/molecules/SearchInput'

const genres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B']

const SearchPage = () => {
  return (
    <div className="p-6">
      <Text variant="h1" className="mb-8">Search</Text>
      <div className="mb-6">
        <SearchInput placeholder="What do you want to listen to?" className="max-w-md" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <div
            key={genre}
            className="bg-gradient-to-br from-primary to-accent p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
          >
            <Text variant="h3" className="text-white">{genre}</Text>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage