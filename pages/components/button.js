import React from 'react'

export default function Button(props) {
  const { text, onClick, className } = props
  return (
    <div className={className} onClick={onClick}>
      {text}{props.children}
    </div>
  )
}
