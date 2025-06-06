import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { formatDuration } from 'date-fns'

export default function MainFeature({ tracks = [], playlists = [] }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [queue, setQueue] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)
  const progressInterval = useRef(null)

  // Simulate audio progress
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

  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-end">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Good evening</h1>
            <p className="text-xl text-surface-200">Ready to discover your next favorite song?</p>
          </div>
        </div>

        {/* Recently Played */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Recently played</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {tracks?.slice(0, 6)?.map((track) => (
              <motion.div
                key={track?.id}
                whileHover={{ scale: 1.02 }}
                className="bg-surface-800/50 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 cursor-pointer group"
                onClick={() => handlePlayTrack(track)}
              >
                <img
                  src={track?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80'}
                  alt={track?.title || 'Track'}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{track?.title || 'Unknown Track'}</h3>
                  <p className="text-surface-400 text-sm truncate">{track?.artist || 'Unknown Artist'}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ApperIcon 
                    name={currentTrack?.id === track?.id && isPlaying ? "Pause" : "Play"} 
                    size={20} 
                    className="text-primary" 
                  />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Made for You */}
          <h2 className="text-2xl font-bold mb-6">Made for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists?.map((playlist) => (
              <motion.div
                key={playlist?.id}
                whileHover={{ y: -4 }}
                className="bg-surface-800/30 backdrop-blur-sm p-4 rounded-lg cursor-pointer group"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'}
                    alt={playlist?.name || 'Playlist'}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-primary rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <ApperIcon name="Play" size={16} className="text-black fill-current" />
                  </button>
                </div>
                <h3 className="font-semibold truncate mb-1">{playlist?.name || 'Untitled Playlist'}</h3>
                <p className="text-surface-400 text-sm line-clamp-2">
                  {playlist?.tracks?.length || 0} songs
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="bg-surface-900/95 backdrop-blur-lg border-t border-surface-600 p-4"
          >
            <div className="flex items-center justify-between">
              {/* Track Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={currentTrack?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80'}
                  alt={currentTrack?.title || 'Track'}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold truncate">{currentTrack?.title || 'Unknown Track'}</h4>
                  <p className="text-surface-400 text-sm truncate">{currentTrack?.artist || 'Unknown Artist'}</p>
                </div>
                <button className="text-surface-400 hover:text-primary transition-colors">
                  <ApperIcon name="Heart" size={16} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePrevTrack}
                    className="text-surface-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="SkipBack" size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
                  >
                    <ApperIcon name={isPlaying ? "Pause" : "Play"} size={20} className="fill-current" />
                  </button>
                  <button 
                    onClick={handleNextTrack}
                    className="text-surface-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="SkipForward" size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-surface-400 min-w-0">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="flex-1"
                  />
                  <span className="text-xs text-surface-400 min-w-0">
                    {formatTime(currentTrack?.duration || 180)}
                  </span>
                </div>
              </div>

              {/* Volume & Queue */}
              <div className="flex items-center gap-4 flex-1 justify-end">
                <button
                  onClick={() => setShowQueue(!showQueue)}
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  <ApperIcon name="List" size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-surface-400 hover:text-white transition-colors">
                    <ApperIcon name={isMuted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={16} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-80 bg-surface-900 border-l border-surface-600 z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Queue</h3>
              <button
                onClick={() => setShowQueue(false)}
                className="text-surface-400 hover:text-white transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {queue?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-surface-800 group">
                  <img
                    src={item?.track?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40'}
                    alt={item?.track?.title || 'Track'}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{item?.track?.title || 'Unknown Track'}</p>
                    <p className="text-surface-400 text-xs truncate">{item?.track?.artist || 'Unknown Artist'}</p>
                  </div>
                  <button
                    onClick={() => removeFromQueue(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-surface-400 hover:text-red-400"
                  >
                    <ApperIcon name="X" size={14} />
                  </button>
                </div>
              ))}
              
              {queue?.length === 0 && (
                <p className="text-surface-400 text-center py-8">No tracks in queue</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}