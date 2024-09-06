import React from 'react'

const Search = ({ className, placeholder, svgClass }) => {
  return (
    <div className="relative">
        <input
            type="text"
            placeholder={placeholder}
            className={className}
        />
        <svg
            className={svgClass}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.41-1.41l4.58 4.58a1 1 0 01-1.41 1.41l-4.58-4.58zm-2.9 0a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
            />
        </svg>
    </div>
  )
}

export default Search