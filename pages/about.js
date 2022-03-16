import React from "react";
import Nav from "./components/nav";
import NFTholder from "./components/NFTholder";
import styles from '../styles/About.module.css'
import Button from "./components/button";

export default function About() {
  return (
    <div>
      {/* <div className={styles.navCont}>
        <Nav />
      </div> */}
      <NFTholder source = '/agra.jpg' city = "New Delhi" nftclaimed = "5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." ><Button className={styles.mintbtn} onClick={console.log('Hello')} text = "Mint" /></NFTholder>
    </div>
  );
}
