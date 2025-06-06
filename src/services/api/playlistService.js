import playlistData from '../mockData/playlists.json'

let playlists = [...playlistData]

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const playlistService = {
  async getAll() {
    await delay()
    return playlists.map(playlist => ({ ...playlist }))
  },

  async getById(id) {
    await delay()
    const playlist = playlists.find(p => p.id === id)
    return playlist ? { ...playlist } : null
  },

  async create(playlistData) {
    await delay()
    const newPlaylist = {
      id: `playlist_${Date.now()}`,
      name: '',
      tracks: [],
      coverUrl: '',
      createdAt: new Date().toISOString(),
      ...playlistData
    }
    playlists.push(newPlaylist)
    return { ...newPlaylist }
  },

  async update(id, playlistData) {
    await delay()
    const index = playlists.findIndex(p => p.id === id)
    if (index !== -1) {
      playlists[index] = { ...playlists[index], ...playlistData }
      return { ...playlists[index] }
    }
    return null
  },

  async delete(id) {
    await delay()
    const index = playlists.findIndex(p => p.id === id)
    if (index !== -1) {
      const deleted = playlists.splice(index, 1)[0]
      return { ...deleted }
    }
    return null
  }
}

export default playlistService