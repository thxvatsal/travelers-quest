import React from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Footer(props) {
  return (
    <div>
      <div className={styles.footer}>
        <Link href='/'><a className={styles.logo}>Traveler&apos;s Quest</a></Link>
        {props.children}
        <div className={styles.rightnav}>
          <Link href="/about"><a className={styles.abt}>About</a></Link>
        </div>
      </div>
    </div>
  )
}
