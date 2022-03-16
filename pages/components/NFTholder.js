import React from 'react'
import Card from './Card'
import styles from '../../styles/NFTholder.module.css'

export default function NFTholder( props ) {
    const { source,city,nftclaimed,details,flexdir } = props;
  return (
    <section className={styles.section} style = {{
        flexDirection: `${flexdir}`
    }}>
        <Card source = {source} city = {city} nftclaimed = {nftclaimed} />
        <div className={styles.details}>
            <h2>{city}</h2>
            <p>{details}</p>
            {props.children}
        </div>
    </section>
  )
}
