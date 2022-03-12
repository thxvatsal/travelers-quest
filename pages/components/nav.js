import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "../../styles/Home.module.css"
import Button from './button'

export default function Nav( props ) {
    function hello () {
        console.log("Hello")
    }
  return (
    <div className={styles.nav}>
        <Image height="80" width="80" src="/vercel.svg" />
        <div className={styles.rightnav}>
            <Link href="/about"><a className={styles.abt}>About</a></Link>
            {props.children}
        </div>
    </div>
  )
}
