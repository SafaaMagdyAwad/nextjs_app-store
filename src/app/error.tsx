'use client'
import React from 'react'

interface Props {
  error: Error
}
export default function Error({ error }: Props) {
  return (
    <div className='text-center'>Error: {error.message}
        <p className="text-red-500">This is a client-side error.</p>
        <p className="text-gray-700">Please try again later.</p>
        <p className="text-gray-500">If the problem persists, contact support.</p>
        <p className="text-gray-500">Thank you for your patience.</p>
     </div>
  )
}
