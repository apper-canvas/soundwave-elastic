import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { trackService, playlistService } from '../services'

export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [tracks, setTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tracksResult, playlistsResult] = await Promise.all([
          trackService.getAll(),
          playlistService.getAll()
        ])
        setTracks(tracksResult || [])
        setPlaylists(playlistsResult || [])
      } catch (err) {
        setError(err?.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const navigation = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'search', label: 'Search', icon: 'Search' },
    { id: 'library', label: 'Your Library', icon: 'Library' }
  ]

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <ApperIcon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-500" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )
    }

    switch (currentView) {
      case 'search':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Search</h1>
            <div className="mb-6">
              <div className="relative">
                <ApperIcon name="Search" size={20} className="absolute left-3 top-3 text-surface-400" />
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  className="w-full max-w-md bg-surface-800 border border-surface-600 rounded-full py-3 pl-10 pr-4 text-white placeholder-surface-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'].map((genre) => (
                <div
                  key={genre}
                  className="bg-gradient-to-br from-primary to-accent p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                >
                  <h3 className="text-xl font-bold text-white">{genre}</h3>
                </div>
              ))}
            </div>
          </div>
        )
      case 'library':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Your Library</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {playlists?.map((playlist) => (
                <motion.div
                  key={playlist?.id}
                  whileHover={{ y: -4 }}
                  className="bg-surface-800 p-4 rounded-lg cursor-pointer group"
                >
                  <div className="relative mb-4">
                    <img
                      src={playlist?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'}
                      alt={playlist?.name || 'Playlist'}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button className="absolute bottom-2 right-2 bg-primary rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ApperIcon name="Play" size={16} className="text-black fill-current" />
                    </button>
                  </div>
                  <h3 className="font-semibold truncate">{playlist?.name || 'Untitled Playlist'}</h3>
                  <p className="text-surface-400 text-sm">
                    {playlist?.tracks?.length || 0} songs
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )
      default:
        return <MainFeature tracks={tracks} playlists={playlists} />
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className="bg-secondary-dark border-r border-surface-700 flex flex-col"
        >
          {/* Logo */}
          <div className="p-6 border-b border-surface-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Music" size={20} className="text-white" />
              </div>
              {!sidebarCollapsed && (
                <h1 className="text-xl font-bold">SoundWave</h1>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-surface-700 text-primary'
                      : 'text-surface-300 hover:text-white hover:bg-surface-800'
                  }`}
                >
                  <ApperIcon name={item.icon} size={20} />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              ))}
            </div>

            {!sidebarCollapsed && (
              <div className="mt-8">
                <h3 className="text-surface-400 text-sm font-medium mb-4 px-3">PLAYLISTS</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-hide">
                  {playlists?.slice(0, 5)?.map((playlist) => (
                    <button
                      key={playlist?.id}
                      className="w-full text-left px-3 py-2 text-surface-300 hover:text-white rounded transition-colors truncate"
                    >
                      {playlist?.name || 'Untitled Playlist'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-4 border-t border-surface-700">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 text-surface-400 hover:text-white transition-colors"
            >
              <ApperIcon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}