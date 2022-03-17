import React from 'react'

export default function Button( props ) {
    const { text,onClick,className } = props
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}
