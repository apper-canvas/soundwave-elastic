import trackData from '../mockData/tracks.json'

let tracks = [...trackData]

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const trackService = {
  async getAll() {
    await delay()
    return tracks.map(track => ({ ...track }))
  },

  async getById(id) {
    await delay()
    const track = tracks.find(t => t.id === id)
    return track ? { ...track } : null
  },

  async create(trackData) {
    await delay()
    const newTrack = {
      id: `track_${Date.now()}`,
      title: '',
      artist: '',
      album: '',
      duration: 180,
      coverUrl: '',
      audioUrl: '',
      ...trackData
    }
    tracks.push(newTrack)
    return { ...newTrack }
  },

  async update(id, trackData) {
    await delay()
    const index = tracks.findIndex(t => t.id === id)
    if (index !== -1) {
      tracks[index] = { ...tracks[index], ...trackData }
      return { ...tracks[index] }
    }
    return null
  },

  async delete(id) {
    await delay()
    const index = tracks.findIndex(t => t.id === id)
    if (index !== -1) {
      const deleted = tracks.splice(index, 1)[0]
      return { ...deleted }
    }
    return null
  }
}

export default trackService