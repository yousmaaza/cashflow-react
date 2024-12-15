import React from 'react';

const buttonVariants = {
  default: "bg-gray-900 text-white hover:bg-gray-800",
  outline: "border border-gray-200 hover:bg-gray-100",
  ghost: "hover:bg-gray-100",
  icon: "p-2 hover:bg-gray-100 rounded-full"
};

const buttonSizes = {
  default: "px-4 py-2",
  sm: "px-3 py-1 text-sm",
  lg: "px-6 py-3",
  icon: "p-2"
};

export const Button = React.forwardRef(({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none 
        disabled:pointer-events-none disabled:opacity-50
        ${buttonVariants[variant] || buttonVariants.default}
        ${buttonSizes[size] || buttonSizes.default}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";