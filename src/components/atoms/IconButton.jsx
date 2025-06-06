import React from "react";
import PropTypes from "prop-types";
import ApperIcon from "../ApperIcon";

const IconButton = ({
  iconName,
  size = "medium",
  variant = "primary",
  disabled = false,
  asIcon = false,
  onClick,
  className = "",
  ...props 
}) => {
  // Normalize size to handle both string and numeric values
  const normalizeSize = (sizeValue) => {
    if (typeof sizeValue === 'string') {
      return sizeValue;
    }
    if (typeof sizeValue === 'number') {
      if (sizeValue < 16) return 'small';
      if (sizeValue <= 24) return 'medium';
      return 'large';
    }
    return 'medium'; // default fallback
  };

  const normalizedSize = normalizeSize(size);

  const sizeClasses = {
    small: "w-6 h-6 text-sm",
    medium: "w-8 h-8 text-base",
    large: "w-10 h-10 text-lg"
  };

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700"
};

  const sizeClass = sizeClasses[normalizedSize] || sizeClasses.medium;
  const colorClass = variantClasses[variant] || variantClasses.primary;

  if (!iconName) {
    console.warn('IconButton: iconName is required');
    return null;
  }

  if (asIcon) {
    return (
      <ApperIcon
        name={iconName}
        className={`${sizeClass} ${colorClass} ${disabled ? "opacity-50" : ""} ${className}`}
        {...props}
      />
);
  }

  return (
    <button
      onClick={onClick || (() => {})}
      disabled={disabled}
      className={`flex items-center justify-center transition-colors rounded ${sizeClass} ${colorClass} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      {...props}
    >
      <ApperIcon name={iconName} className={sizeClass.replace(/text-\S+/, '').trim()} />
    </button>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large"]),
    PropTypes.number
  ]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  disabled: PropTypes.bool,
  asIcon: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default IconButton;