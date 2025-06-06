import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { trackService, playlistService } from '@/services'
import ApperIcon from '@/components/ApperIcon'
import Sidebar from '@/components/organisms/Sidebar'
import HeroSection from '@/components/organisms/HeroSection'
import RecentTracksSection from '@/components/organisms/RecentTracksSection'
import PlaylistGrid from '@/components/organisms/PlaylistGrid'
import NowPlayingBar from '@/components/organisms/NowPlayingBar'
import QueuePanel from '@/components/organisms/QueuePanel'
import SearchInput from '@/components/molecules/SearchInput'
import Text from '@/components/atoms/Text'

export default function HomePage() {
  const [currentView, setCurrentView] = useState('home')
  const [tracks, setTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [queue, setQueue] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const progressInterval = useRef(null)

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

  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          const duration = currentTrack?.duration || 180
          const newProgress = (newTime / duration) * 100
          setProgress(newProgress)
          
          if (newTime >= duration) {
            handleNextTrack()
            return 0
          }
          return newTime
        })
      }, 1000)
    } else {
      clearInterval(progressInterval.current)
    }

    return () => clearInterval(progressInterval.current)
  }, [isPlaying, currentTrack])

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track?.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setCurrentTime(0)
      setProgress(0)
      toast.success(`Now playing: ${track?.title || 'Unknown Track'}`)
    }
  }

  const handleNextTrack = () => {
    const currentIndex = tracks?.findIndex(t => t?.id === currentTrack?.id) || 0
    const nextTrack = tracks?.[currentIndex + 1] || tracks?.[0]
    if (nextTrack) {
      handlePlayTrack(nextTrack)
    }
  }

  const handlePrevTrack = () => {
    const currentIndex = tracks?.findIndex(t => t?.id === currentTrack?.id) || 0
    const prevTrack = tracks?.[currentIndex - 1] || tracks?.[tracks?.length - 1]
    if (prevTrack) {
      handlePlayTrack(prevTrack)
    }
  }

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value)
    const duration = currentTrack?.duration || 180
    const newTime = (newProgress / 100) * duration
    setProgress(newProgress)
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setVolume(0)
    } else {
      // Restore previous volume or default
      setVolume(75) 
    }
  }

  const addToQueue = (track) => {
    setQueue(prev => [...prev, { track, position: prev.length + 1, addedAt: new Date() }])
    toast.success(`Added "${track?.title || 'Unknown Track'}" to queue`)
  }

  const removeFromQueue = (index) => {
    setQueue(prev => prev.filter((_, i) => i !== index))
    toast.info("Removed from queue")
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
            <Text variant="p" className="text-red-400">{error}</Text>
          </div>
        </div>
      )
    }

    switch (currentView) {
      case 'search':
        return (
          <div className="p-6">
            <Text variant="h1" className="mb-8">Search</Text>
            <div className="mb-6">
              <SearchInput placeholder="What do you want to listen to?" className="max-w-md" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'].map((genre) => (
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
      case 'library':
        return <PlaylistGrid playlists={playlists} title="Your Library" />
      default:
        return (
          <>
            <HeroSection
              title="Good evening"
              subtitle="Ready to discover your next favorite song?"
            />
            <RecentTracksSection
              tracks={tracks?.slice(0, 6)}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackClick={handlePlayTrack}
              title="Recently played"
            />
            <PlaylistGrid
              playlists={playlists}
              title="Made for you"
            />
          </>
        )
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navigation={navigation}
          playlists={playlists}
          currentView={currentView}
          onNavigate={setCurrentView}
          sidebarCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

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
      <NowPlayingBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={currentTrack?.duration || 180}
        volume={volume}
        isMuted={isMuted}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onPreviousTrack={handlePrevTrack}
        onProgressChange={handleProgressChange}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onToggleQueue={() => setShowQueue(!showQueue)}
        formatTime={formatTime}
      />
      <QueuePanel
        showQueue={showQueue}
        queue={queue}
        onClose={() => setShowQueue(false)}
        onRemoveFromQueue={removeFromQueue}
      />
    </div>
  )
}