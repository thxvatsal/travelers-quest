import React from "react";

import Nav from "./components/nav";
import NFTholder from "./components/NFTholder";
import Button from "./components/button";
import Image from "next/image";

import styles from '../styles/About.module.css'
import Link from "next/link";
import Footer from "./components/Footer";

export default function About() {
  return (
    <>
      <Nav />
      <section className={styles.hero}>
        <div className={styles.sect}>
          <h2>What is Traveler&apos;s Quest?</h2>
          <p>
            Amet pariatur excepteur Lorem ea ullamco anim sunt adipisicing dolor laboris ut. Lorem ipsum enim deserunt incididunt exercitation magna proident fugiat occaecat labore adipisicing sunt enim. Velit pariatur est tempor elit ullamco in sunt laborum commodo anim commodo incididunt enim nulla. Pariatur ea irure velit in velit sint ut incididunt. Dolor nostrud tempor est aliqua incididunt nisi proident enim.
          </p>
        </div>
        <div className={styles.sect}>
          <h2>Why we built it?</h2>
          <p>
            Labore consectetur id est duis sint sit labore deserunt ea elit. Proident nisi duis fugiat dolor veniam occaecat ut ea. Duis labore est duis mollit nulla excepteur et ad magna. Id nostrud in elit ut in aliqua nisi nostrud tempor. Ea est exercitation esse fugiat sunt sunt irure et reprehenderit dolore dolor. Occaecat quis velit duis mollit in velit adipisicing velit tempor cupidatat sit excepteur.
          </p>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Our Team</h2>
        
        <div className={styles.team}>
          
          <div className={styles.member}>
            <div className={styles.img}><Image src='/agra.jpg' height="400px" width="300px" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>
        
          <div className={styles.member}>
            <div className={styles.img}><Image src='/agra.jpg' height="400px" width="300px" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>

          <div className={styles.member}>
            <div className={styles.img}><Image src='/agra.jpg' height="400px" width="300px" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>

          <div className={styles.member}>
            <div className={styles.img}><Image src='/agra.jpg' height="400px" width="300px" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>

          <div className={styles.member}>
            <div className={styles.img}><Image src='/agra.jpg' height="400px" width="300px" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>


        </div>
        <span className={styles.wagmi}>#WAGMI🚀</span>
      </section>
      <Footer />
    </>
  );
}
