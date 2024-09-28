import React from 'react'

const FormContainer = ({children, className}) => {
  return (
    <div className={`md:w-1/2 md:border bg-white md:border-gray-400 p-4 md:px-8 md:py-4 rounded-md md:shadow-2xl md:mx-auto overflow-auto ${className}`}>
      {children}
    </div>
  )
}

export default FormContainer
