import React from "react";

import {NFT_CONTRACT_ADDRESS} from "../constants"
import Nav from "./components/nav";
import NFTholder from "./components/NFTholder";
import Button from "./components/button";
import Image from "next/image";

import styles from '../styles/About.module.css'
import Link from "next/link";
import Footer from "./components/Footer";

export default function About() {
  const contractLink = `https://mumbai.polygonscan.com/address/${NFT_CONTRACT_ADDRESS}`
  const discord = "https://discord.gg/gB3Bkzrh"
  return (
    <>
      <Nav />
      <section className={styles.hero}>
        <div className={styles.sect}>
          <h2>What is Traveler&apos;s Quest? 🧐</h2>
          <p>
          Traveler&apos;s quest is a project that adds a digital proof as a sign of a memory of being in that place. We have NFTs available and can only be minted if you are in that particular place and the way we do it is by having the geolocation value. <br />
          Traveling has always been fascinating and a fun adventure to have and now with traveler quest&apos;s feature we could also add capabilities of private access communities and much more that comes with integration of NFTs.
          </p>
        </div>
        <div className={styles.sect}>
          <h2>Why we built it? 🚀</h2>
          <p>
          Whenever we travel, we remember the amazing experiences we&apos;ve had over there. Taking this idea forward, We created this project where we have added NFTs as a symbol/memory. With Traveler&apos;s quest, not only will you be able to keep the NFT as a sign of that particular place, but in the upcoming updates you will also be able to get access to private communities that will open the doors for you to meet more people who share the same interests, hangout and exchange ideas with people around the world.
          </p>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Our Team 🫂</h2>
        <span className={styles.teamdes}>The journey of building with this beautiful has been the most blissful, the efforts, passion and drive of each and every member drives the other.</span>
        <div className={styles.team}>
          {/* Vatsal 3/3 */}
          <div className={styles.member}>
            <div className={styles.img}><Image src='/team/Vatsal.jpg' height="400px" width="400px" alt="" /></div>
            <span className={styles.name}>Vatsal Awadhiya</span>
            <span className={styles.job}>Frontend 🎨</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/theVatsal_eth"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/theVatsal-eth"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/vatsal-awadhiya/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>
          {/* Aayush 3/3 */}
          <div className={styles.member}>
            <div className={styles.img}><Image src='/team/Aayush.jpg' height="400px" width="400px" alt="" /></div>
            <span className={styles.name}>Aayush Gupta</span>
            <span className={styles.job}>Smart Contract Developer ✏️</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/Aayush_gupta_ji"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/AAYUSH-GUPTA-coder"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/aayush-gupta-20023b183/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>
          {/* Anish 3/3 */}
          <div className={styles.member}>
            <div className={styles.img}><Image src='/team/Anish.png' height="400px" width="400px" alt="" /></div>
            <span className={styles.name}>Anish Jain</span>
            <span className={styles.job}>Backend 🛠️</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/itsanishjain"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/itsanishjain"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/anish-jain-a401501b5/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>
          {/* Abbas 3/3*/}
          <div className={styles.member}>
            <div className={styles.img}><Image src='/team/abbas2.jpg' height="400px" width="400px" alt="" /></div>
            <span className={styles.name}>Abbas Khan</span>
            <span className={styles.job}>Content Writing 📜</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/KhanAbbas201"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/Abbas-Khann"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/abbas-khan-033802222"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>
          {/* Yash 3/3 */}
          <div className={styles.member}>
            <div className={styles.img}><Image src='/team/yash4.jpg' height="400px" width="400px" alt="" /></div>
            <span className={styles.name}>Yash Solanki</span>
            <span className={styles.job}>UI Design 🖌️</span>
            <span className={styles.links}>
              <Link href="https://twitter.com/YashSolanki_"><a target="_blank" className={styles.twitter}>Twitter</a></Link>
              <Link href="https://github.com/yashsolanki22"><a target="_blank" className={styles.github}>Github</a></Link>
              <Link href="https://www.linkedin.com/in/yash-solanki-2a4810189/"><a target="_blank" className={styles.linkedin}>LinkedIn</a></Link>
            </span>
          </div>


        </div>
        <span className={styles.wagmi}>#WAGMI🚀</span>
        <span className={styles.contract}>Contract Address 📄 : <Link href={contractLink}><a target="_blank">{NFT_CONTRACT_ADDRESS}</a></Link></span>
        <span className={styles.discord}><Link href={discord}><a target="_blank">Click here to join the herd at Discord! 🚀</a></Link></span>
      </section>
      <Footer />
    </>
  );
}
