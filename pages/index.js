import styles from "../styles/Home.module.css";
import { useRef, useState, useEffect } from "react";

import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

import { Contract, providers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../constants/index";

import Nav from "./components/nav";
import Button from "./components/button";
import NFTholder from "./components/NFTholder";
import Loader from "./components/Loader"
import Link from "next/link";
import Footer from "./components/Footer";
import Head from 'next/head';

import { Biconomy } from "@biconomy/mexa";

// let TravellContract;

const itemlist = [
  {
    source: "/agra.jpg",
    city: "Agra",
    details:
      "Agra is a popular tourist destination as it is home to one of the 7 wonders of the world, the Taj Mahal. It is a sneak peek into the architectural history and legacy of the Mughal empire with two other UNESCO World Heritage Sites Agra Fort and Fatehpur Sikri. History, architecture, romance all together create the magic of Agra, and hence, makes for a must-visit for anyone living in or visiting India.",
    nftclaimed: 0,
  },
  {
    source: "/delhi.jpg",
    city: "New Delhi",
    details: "Dolor dolor consectetur id aliquip laborum et. Consequat velit duis reprehenderit culpa aute aliqua laborum voluptate eiusmod. Aliquip et commodo nostrud et laborum cillum enim ullamco in enim irure qui.",
    details:
      "A symbol of the India's rich past and thriving present. The capital of India, Delhi is a cosmopolitan city with a historic old Delhi and the modern New Delhi. From historical monuments to crowded shopping malls, from an extensive network of the modern metro system to Delhi University campus, Dilli has multiple personalities and is considered to be the city with a heart.",
    nftclaimed: 0,
  },
  {
    source: "/manali.jpg",
    city: "Manali",
    details:
      "A gift of the Himalayas to the world, Manali is a beautiful township nestled in the picturesque Beas River valley. It is a rustic enclave known for its cool climate and snow-capped mountains. Manali cocooned in its rich cultural heritage and age-old traditions is now one of the most popular destinations of India. The place is a classic blend of peace and tranquility which makes it a haven for nature lovers and adventure enthusiasts, who want to get off the main tourist trails and experience nature up close.",
    nftclaimed: 0,
  },
  {
    source: "/mumbai.jpg",
    city: "Mumbai",
    details:
      "Mumbai, often referred as “the city of dreams” for all the right reasons, is a place that every traveller must visit. Mumbai presents a unique experience that is unmatched to any other destination. Mumbai is the city of aspirations, power, wealth, glamour and nightlife along with stretches of shimmering beaches, caves, magnificent architecture, religious sites and a mouth-watering cuisine. With all this exciting and varied recreational opportunities Mumbai offers a wholesome holiday experience.",
    nftclaimed: 0,
  },
  {
    source: "/goa.jpg",
    city: "Goa",
    details:
      "Goa is India's smallest state and unlike any other, known for its endless beaches, stellar nightlife, eclectic seafood, world-heritage listed architecture. Goa has one of the best nightlife in India with trendy bars, beach shacks, elegant cafes and many clubs and discotheques.In Old Goa, the beautiful Basilica of Bom Jesus is a UNESCO World Heritage Site and a fine example of baroque architecture.",
    nftclaimed: 0,
  },
  {
    source: "/jaipur.jpg",
    city: "Jaipur",
    details:
      "Jaipur holds the distinction of being the first planned city of India. Renowned globally for its coloured gems, the capital city of Rajasthan combines the allure of its ancient history with all the advantages of a metropolis. Spend your days exploring City Palace, Hawa Mahal, and Amber and Jaigarh forts. And if you're looking for a unique souvenir, head to one of the bazaars, where you can pick up a pair of camel-leather slippers.",
    nftclaimed: 0,
  },
  {
    source: "/ethernals.jpg",
    city: "Ethernals",
    details:
      "Supercharge yourself for ETHernals: the first ETHIndia Online hackathon of 2022! You are a part of the amazing community who are changing the world for better. On the way to becoming an ETHernal: You have become a better developer, have an Unforgettable Digital Experience in the ETHernals Metaverse and probably have exclusive Schwags to show off.",
    nftclaimed: 0,
  },
];


export default function Home() {

  //Hooks
  const [walletConnected, setWalletConnected] = useState(false)
  const [Signer, setSigner] = useState()
  const [loading, setLoading] = useState();
  // const [ signerObj, setSignerObj ] = useState();
  const [items, setItems] = useState(itemlist);
  // const [contract, setContract] = useState();

  const web3ModalRef = useRef()

  // Items list
  

 
  // console.log(Web3Modal.onClose)
  // console.log(web3ModalRef.current)


  // Format error
  const checkErrorTypeAndNotify = (error) => {
    if (error.hasOwnProperty('data')) {
      toast.error(error.data.message)
      return
    }
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
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    //! Tried to implement biconomy to make gasless minting. Doubts unresolved regarding frontend configuration.

    // *biconomy = new Biconomy(provider, { apiKey: process.env.NEXT_PUBLIC_BICONOMY_API, debug: true });
    // *const web3Provider = new providers.Web3Provider(biconomy);

    const { chainId } = await web3Provider.getNetwork()

    if (chainId != 80001) {
      throw new Error("Change Your Network To Mumbai");
    }
    const signer = web3Provider.getSigner()
    const userAccount = await signer.getAddress()
    setSigner(userAccount);

    // set the Signer to localStorage
    localStorage.setItem('userAccount', userAccount);
    // setSignerObj(signer)
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
    setLoading(tokenId);
    try {

      const signer = await getProviderOrSigner(true);

      const TravelContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );

      const tx = await TravelContract.mint(tokenId);
      await tx.wait();
      toast("You successfully minted your NFT")

    } catch (error) {
      checkErrorTypeAndNotify(error);
    }
    setLoading();
  }

  useEffect(() => {
    if (!walletConnected) {
      connectWallet(); 
      for (let i = 0; i < itemlist.length; i++) {
        fetchNftClaimed(i)
      }
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
    localStorage.setItem('userAccount', '')
    setWalletConnected(false)
  }

  const checkPosition = async (tokenId) => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((coords) => {
        console.log("Coordinates fetched!")
        checkAdd(coords)
      });
    } else {
      toast("Please allow location access for minting NFT.")
    }
    const checkAdd = async (position) => {
      if (tokenId === (items.length -1)) {
        toast(`💡 Fun Fact: Ethernals NFTs can be minted from anywhere in the world!`)
        await mintNFT(tokenId)
        setLoading()
      }
      else {
        try {
          console.log("Checking the city of the address.")
          toast("Checking your city, please wait.")
          setLoading(tokenId)
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
          );
          console.log("API called successfully!")
          
          const { results } = await res.json()

          console.log("Results extracted.")
          
          const add = results.find(add => {
            if (add.types[0] == "locality") {
              console.log("Location City fetched.")
              return add.address_components[0].long_name
            }
          })

          const state = results.find(add => {
            if (add.types[0] == "administrative_area_level_1") {
              console.log("Location City fetched.")
              return add.address_components[0].long_name
            }
          })

          if (add.address_components[0].long_name === items[tokenId].city || state.address_components[0] == items[tokenId].city) {
            // setLoading(true)
            await mintNFT(tokenId)
            // setLoading(false)
            setLoading()
          } else {
            toast(`We are detecting you at ${add.address_components[0].long_name}, visit ${items[tokenId].city} to mint the NFT!`)
            setLoading()
          }
        }
        catch (error) {
          console.log(error)
          checkErrorTypeAndNotify(error)
          setLoading()
        }
      }
    }
  }
  // console.log(1,fetchNftClaimed(0))
  async function fetchNftClaimed (index) {
    const signer = await getProviderOrSigner();

    const TravelContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer,
    );
    // setContract(TravelContract)
    const bigNumber = await TravelContract.totalNftMinted(index)
    console.log(2,bigNumber)
    const claimed = await bigNumber.toNumber()
    console.log(3,claimed)
    // items[index].nftclaimed = claimed
    let itemslist = [...items];
    let item = itemslist[index];
    item.nftclaimed = claimed;
    itemslist[index] = item
    setItems(itemslist)
    console.log(itemslist)

    return claimed
  }

  return (
    <div>
      <div className={styles.navcont}>
        <Nav>
          {
            !walletConnected ?
              (<Button className={styles.btn} onClick={connectWallet} text="Connect Wallet" />)
              :
              (<>
                <Link href="/profile"><a className={styles.abt}>Profile</a></Link>
                <Button className={styles.hashbtn} onClick={logout} text={shortenHash(Signer, 5, 5)} />
              </>)
          }
        </Nav>
      </div>

      <ToastContainer />

      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Traveler&apos;s Quest</h1>
          <p>Let the quest to travel and exploring the world take a big leap into the another dimension with the support of NFTs and community. Showcase your achievements, exploration and get more closer with people who share similar interests and craziness all at one Place! </p>
        </div>

        <div className={styles.slider}><img style={{
          // objectFit:"contain",
          height: "100%",
          width: "100%"
        }} src='/agra.jpg' alt="slider" />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/delhi.jpg' alt="slider" />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/manali.jpg' alt="slider" />
          <img style={{
            // objectFit:"contain",
            height: "100%",
            width: "100%"
          }} src='/jaipur.jpg' alt="slider" />
        </div>

      </div>


      {
        items && items.map((item, index) => {
          return (
            index % 2 != 0 ? (
              <NFTholder
                flexdir="row"
                key={index}
                source={item.source}
                city={item.city}
                details={item.details}
                nftclaimed={item.nftclaimed}
              >{
                  loading != index ? (
                    <Button
                      className={styles.mintbtn}
                      text="Mint"
                      onClick={() => checkPosition(index)} />
                  ) : (
                    <Loader />
                  )
                }
              </NFTholder>
            ) : (
              <NFTholder
                flexdir="row-reverse"
                key={index}
                source={item.source}
                city={item.city}
                details={item.details}
                nftclaimed={item.nftclaimed}
              >{
                  loading != index ? (
                    <Button
                      className={styles.mintbtn}
                      text="Mint"
                      onClick={() => checkPosition(index)} />
                  ) : (
                    <Loader />
                  )
                }
              </NFTholder>
            )

          )
        })
      }
      <Footer />
    </div>
  )
}
