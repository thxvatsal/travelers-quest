import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Card.module.css'

export default function Card(props) {
    const { source, city, nftclaimed } = props
  return (
    <div className={styles.card}>
        <img src={source} className={styles.image} width="300px" height="400px" />
        <div className={styles.details}>
            <h2>{city}</h2>
            <span>Claimed: {nftclaimed}/50 🎉</span>
        </div>
    </div>
  )
}
