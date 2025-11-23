import React from 'react'

const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      {title && <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
