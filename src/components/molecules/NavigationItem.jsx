import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@/components/atoms/IconButton'
import Text from '@/components/atoms/Text'

const NavigationItem = ({ iconName, label, onClick, isActive = false, isCollapsed = false }) => {
  const handleClick = (e) => {
    if (onClick && typeof onClick === 'function') {
      onClick(e)
    }
  }

  if (!iconName || !label) {
    return null
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-surface-700 text-primary'
          : 'text-surface-300 hover:text-white hover:bg-surface-800'
      }`}
    >
      <IconButton iconName={iconName} size={20} className="text-current hover:text-current" />
      {!isCollapsed && <Text variant="span" className="font-medium text-current">{label}</Text>}
    </button>
  )
}

NavigationItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isCollapsed: PropTypes.bool
}

export default NavigationItem