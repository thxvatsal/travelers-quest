import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "../../styles/Home.module.css"
import Button from './button'

export default function Nav( props ) {
  return (
    
      <div className={styles.nav}>
          <Link href='/'><a className={styles.logo}>Traveler&apos;s Quest</a></Link>
          <div className={styles.rightnav}>
              <Link href="/about"><a className={styles.abt}>About</a></Link>
              {props.children}
          </div>
      </div>
  )
}
