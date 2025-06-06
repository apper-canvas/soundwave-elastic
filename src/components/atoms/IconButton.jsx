import React from "react";
import PropTypes from "prop-types";
import ApperIcon from "./ApperIcon";
const IconButton = ({
  iconName,
  size = "medium",
  variant = "primary",
  disabled = false,
  asicon = false,
  onClick,
  className = "",
  ...props 
}) => {
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

  const sizeclass = sizeClasses[size] || sizeClasses.medium;
  const colorclass = variantClasses[variant] || variantClasses.primary;

  if (!iconName) {
    console.warn('IconButton: iconName is required');
    return null;
  }

  if (asicon) {
    return (
      <ApperIcon
        name={iconName}
        className={`${sizeclass} ${colorclass} ${disabled ? "opacity-50" : ""} ${className}`}
        {...props}
      />
    );
}

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center transition-colors rounded ${sizeclass} ${colorclass} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      {...props}
    >
      <ApperIcon name={iconName} className={sizeclass.replace(/text-\S+/, '')} />
    </button>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  disabled: PropTypes.bool,
  asicon: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default IconButton;