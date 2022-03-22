
import styles from '../styles/Home.module.css'
import { useRef, useState, useEffect } from 'react'

import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'

import { Contract, providers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from './components/nav'
import Button from './components/button'
import Loader from './components/Loader'
import NFTholder from './components/NFTholder';


import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../constants/index"
import Footer from './components/Footer';


export default function Home() {
  console.log(Web3Modal.onClose)
  const [walletConnected, setWalletConnected] = useState(false)
  const [Signer, setSigner] = useState()
  const [loading, setLoading] = useState(false);


  const web3ModalRef = useRef()
  console.log(web3ModalRef.current)


  // Format error
  const checkErrorTypeAndNotify = (error) => {
    if (error.message.includes("reverted")) {
      toast.error(error.error.message);
    } else if (
      error.message.includes(
        "MetaMask Tx Signature: User denied transaction signature."
      )
    ) {
      toast.error("Transaction cancelled");
    } else {
      toast.error(error.message);
    }
  };

  // getting signer or provider
  const getProviderOrSigner = async (needSigner = true) => {

    console.log("PAPAPAAP")
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    console.log(web3Provider,":::::::::::::::::::::::::")

    const { chainId } = await web3Provider.getNetwork()
    console.log(">>>>>>>>>>>>>>>" + chainId)

    if (chainId != 80001) {
      console.log("HEEEE")
      toast("Change the Network to Mumbai")
      throw new Error("Change the network to mumbai");
    }

    const signer = web3Provider.getSigner()
    console.log(1, signer.getAddress())
    setSigner(await signer.getAddress());

    return signer;
  }
  const providerOptions = {
    walletconnect: WalletConnectProvider
  }

  // connecting wallet
  const connectWallet = async () => {
    try {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions,
        disableInjectedProvider: false,
      });
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err)
      checkErrorTypeAndNotify(err);
    }
  }

  // mint function 
  const mintNFT = async (tokenId) => {
    try {
      const signer = await getProviderOrSigner(true);

      const TravellContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );

      const tx = await TravellContract.mint(tokenId);

      setLoading(true);
      await tx.wait();

      setLoading(false);
      toast("You successfully minted your X");

    } catch (error) {
      console.error(error);
      checkErrorTypeAndNotify(error);
    }
  }

  // useEffecting those functions
  useEffect(() => {
    if (!walletConnected) {
      connectWallet();
    }
  }, [])

  // hash shortner
  const shortenHash = (hash = '', charLength = 6, postCharLength) => {
    let shortendHash;
    if (postCharLength) {
      shortendHash =
        hash.slice(0, charLength) +
        '...' +
        hash.slice(hash.length - postCharLength, hash.length);
    } else {
      shortendHash = hash.slice(0, charLength);
    }
    return shortendHash;
  };
  // logout func
  const logout = async () => {
    await web3ModalRef.current.clearCachedProvider()
    setWalletConnected(false)
    console.log(2, web3ModalRef)
  }

  //check position
  // const [ coords, setCoords ] = useState()
  const checkPosition = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((coords) => {
        console.log(coords)
        checkAdd(coords)
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    const checkAdd = async (position) => {
      console.log(position.coords.latitude)
      const key = process.env.NEXT_PUBLIC_RAPID_API_KEY
      const res = await fetch(
        `https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${position.coords.latitude}%2C${position.coords.longitude}&language=en`,
        {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            `${key}`,
          },
        }
      )
      console.log(res)
      const {results} = await res.json()
      console.log(results)
      const add = results.find(add => {
        if (add.types[0] == "locality") {
          console.log(add.address_components[0].long_name)
          return add.address_components[0].long_name
        }
      })
      console.log('address',add.address_components[0].long_name)
      if (add.address_components[0].long_name === 'Indore') {
        setLoading(true)
        await mintNFT(0)
        setLoading(false)
      }
    }
    // console.log(coords)
  }

  return (
    <div>
      <div className={styles.navcont}>
        <Nav>
          {
            !walletConnected ?
              (<Button className={styles.btn} onClick={connectWallet} text="Connect Wallet" />)
              :
              (<Button className={styles.hashbtn} onClick={logout} text={shortenHash(Signer, 5, 5)} />)

          }
        </Nav>
      </div>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Traveler&apos;s Quest</h1>
          <p>Exercitation veniam aliquip velit nulla consectetur laboris adipisicing proident. Deserunt adipisicing magna proident magna nulla. Aliquip excepteur Lorem est et tempor est.</p>
        </div>
        <div className={styles.slider}><img style={{
          // objectFit:"contain",
          height: "100%",
          width: "100%"
        }} src='/agra.jpg' />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/agra.jpg' />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/manali.jpg' />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/manali.jpg' />
        </div>

      </div>

      <NFTholder source='/agra.jpg' city="New Delhi" nftclaimed="5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." flexdir="row-reverse">{!loading ? <Button className={styles.mintbtn} onClick={() => mintNFT(0)} text="Mint" /> : <Button className={styles.mintbtn} onClick={() => {}} text="Loading" />}
      </NFTholder>

      <NFTholder source='/agra.jpg' city="New Delhi" nftclaimed="5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." flexdir="row"><Button className={styles.mintbtn} onClick={checkPosition} text="Mint" /></NFTholder>
      <NFTholder source='/agra.jpg' city="New Delhi" nftclaimed="5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." flexdir="row-reverse"><Button className={styles.mintbtn} onClick={console.log('Hello')} text="Mint" /></NFTholder>
      <NFTholder source='/agra.jpg' city="New Delhi" nftclaimed="5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." flexdir="row"><Button className={styles.mintbtn} onClick={console.log('Hello')} text="Mint" /></NFTholder>
      <NFTholder source='/agra.jpg' city="New Delhi" nftclaimed="5" details="Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui." flexdir="row-reverse"><Button className={styles.mintbtn} onClick={console.log('Hello')} text="Mint" /></NFTholder>

      <Footer />
    </div>
  )
}


// 9:61  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
