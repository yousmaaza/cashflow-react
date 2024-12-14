import { forwardRef } from "react"

const Alert = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={`rounded-lg border p-4 ${
        variant === "destructive" 
          ? "border-red-500 bg-red-50 text-red-700" 
          : "border-gray-200 bg-white text-gray-900"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

const AlertTitle = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={`mb-1 font-medium leading-none ${className}`}
      {...props}
    >
      {children}
    </h5>
  )
})

const AlertDescription = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

export { Alert, AlertTitle, AlertDescription }