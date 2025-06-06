import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '@/components/atoms/IconButton'
import RangeSlider from '@/components/atoms/RangeSlider'
import PlaybackControls from '@/components/molecules/PlaybackControls'
import SongInfo from '@/components/molecules/SongInfo'
const NowPlayingBar = ({
  currentTrack = null,
  isPlaying,
  progress,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onNextTrack,
  onPreviousTrack,
  onProgressChange,
  onVolumeChange,
  onToggleMute,
  onToggleQueue,
  formatTime
}) => {
  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="bg-surface-900/95 backdrop-blur-lg border-t border-surface-600 p-4"
        >
          <div className="flex items-center justify-between">
            <SongInfo
              imageUrl={currentTrack?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80'}
              title={currentTrack?.title || 'Unknown Track'}
              artist={currentTrack?.artist || 'Unknown Artist'}
            />

            <PlaybackControls
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
              onNext={onNextTrack}
              onPrevious={onPreviousTrack}
              progress={progress}
              onProgressChange={onProgressChange}
              currentTime={currentTime}
              duration={duration}
              formatTime={formatTime}
            />

            <div className="flex items-center gap-4 flex-1 justify-end">
              <IconButton iconName="List" size={16} onClick={onToggleQueue} />
              <div className="flex items-center gap-2">
                <IconButton
                  iconName={isMuted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"}
                  size={16}
                  onClick={onToggleMute}
                />
                <RangeSlider
                  value={isMuted ? 0 : volume}
                  onChange={onVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

NowPlayingBar.propTypes = {
  currentTrack: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  isMuted: PropTypes.bool.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onNextTrack: PropTypes.func.isRequired,
  onPreviousTrack: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
  onToggleQueue: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired
}

export default NowPlayingBar