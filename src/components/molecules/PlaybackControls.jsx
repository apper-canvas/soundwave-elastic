import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@/components/atoms/IconButton'
import ProgressBar from '@/components/atoms/ProgressBar'
import Text from '@/components/atoms/Text'

const PlaybackControls = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  progress,
  onProgressChange,
  currentTime,
  duration,
  formatTime
}) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
      <div className="flex items-center gap-4">
        <IconButton iconName="SkipBack" size={20} onClick={onPrevious} />
        <IconButton
          iconName={isPlaying ? "Pause" : "Play"}
          size={20}
          onClick={onTogglePlay}
          className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform fill-current hover:text-black"
        />
        <IconButton iconName="SkipForward" size={20} onClick={onNext} />
      </div>
      <div className="flex items-center gap-2 w-full">
        <Text variant="small" className="min-w-0">{formatTime(currentTime)}</Text>
        <ProgressBar
          value={progress}
          onChange={onProgressChange}
          className="flex-1"
        />
        <Text variant="small" className="min-w-0">{formatTime(duration)}</Text>
      </div>
    </div>
  )
}

PlaybackControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  onProgressChange: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired
}

export default PlaybackControls