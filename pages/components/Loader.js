import React from 'react'
import styles from '../../styles/Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.lds}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
