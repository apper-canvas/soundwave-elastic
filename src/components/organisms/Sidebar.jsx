import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import NavigationItem from '@/components/molecules/NavigationItem'
import IconButton from '@/components/atoms/IconButton'
import Text from '@/components/atoms/Text'

const Sidebar = ({
  navigation,
  playlists,
  currentView,
  onNavigate,
  sidebarCollapsed,
  onToggleCollapse
}) => {
  return (
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
            <Text variant="h3">SoundWave</Text>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavigationItem
              key={item.id}
              iconName={item.icon}
              label={item.label}
              onClick={() => onNavigate(item.id)}
              isActive={currentView === item.id}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </div>

        {!sidebarCollapsed && (
          <div className="mt-8">
            <Text variant="small" className="text-surface-400 font-medium mb-4 px-3 uppercase">Playlists</Text>
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
        <IconButton
          iconName={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
          size={20}
          onClick={onToggleCollapse}
          className="w-full justify-center text-surface-400 hover:text-white"
        />
      </div>
    </motion.div>
  )
}

Sidebar.propTypes = {
  navigation: PropTypes.array.isRequired,
  playlists: PropTypes.array.isRequired,
  currentView: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  sidebarCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired
}

export default Sidebar