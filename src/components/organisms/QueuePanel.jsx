import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Text from '@/components/atoms/Text'
import Image from '@/components/atoms/Image'
import IconButton from '@/components/atoms/IconButton'

const QueuePanel = ({ showQueue, queue, onClose, onRemoveFromQueue }) => {
  return (
    <AnimatePresence>
      {showQueue && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-80 bg-surface-900 border-l border-surface-600 z-50 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <Text variant="h3">Queue</Text>
            <IconButton iconName="X" size={20} onClick={onClose} />
          </div>
          
          <div className="space-y-3">
            {queue?.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-surface-800 group">
                <Image
                  src={item?.track?.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40'}
                  alt={item?.track?.title || 'Track'}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <Text variant="p" className="font-medium truncate text-sm">{item?.track?.title || 'Unknown Track'}</Text>
                  <Text variant="span" className="text-surface-400 truncate text-xs">{item?.track?.artist || 'Unknown Artist'}</Text>
                </div>
                <IconButton
                  iconName="X"
                  size={14}
                  onClick={() => onRemoveFromQueue(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-surface-400 hover:text-red-400"
                />
              </div>
            ))}
            
            {queue?.length === 0 && (
              <Text variant="p" className="text-surface-400 text-center py-8">No tracks in queue</Text>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

QueuePanel.propTypes = {
  showQueue: PropTypes.bool.isRequired,
  queue: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromQueue: PropTypes.func.isRequired
}

export default QueuePanel