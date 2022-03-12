import React from 'react'
import styles from "../../styles/Home.module.css"

export default function Button( props ) {
    const { text,onClick,className } = props
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}
