import React from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Footer(props) {
  return (
    <div>
      <p><a href='https://testnets.opensea.io/assets/mumbai/0x0bE0bAE1f5738041422b72150Bf7440206A663cb/0'>VIEW OPENSEA</a></p>


      <div className={styles.footer}>
        <Link href='/'><a className={styles.logo}>Traveler&apos;s Quest</a></Link>
        <div className={styles.rightnav}>
          <Link href="/about"><a className={styles.abt}>About</a></Link>
          {props.children}
        </div>
      </div>
    </div>
  )
}
