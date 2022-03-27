import { useEffect, useState } from 'react'
import { NFT_CONTRACT_ADDRESS } from '../constants'

import styles from '../styles/profile.module.css'

import Nav from './components/nav'
import Loader from './components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;


export default function Profile() {

  const [ nfts, setNfts ] = useState();
  const [ loading, setLoading ] = useState(true)


  // function to get tokenID of NFT owned by user
  const getAddressNFTs = async (owner, contractAddress, retryAttempt) => {
    if (retryAttempt === 5) {
      return;
    }
    if (owner) {
      let data;
      try {
        if (contractAddress) {
          data = await fetch(
            `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
          ).then((data) => data.json());
        } else {
          data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data) =>
            data.json()
          );
        }
      } catch (e) {
        getAddressNFTs(endpoint, owner, contractAddress, retryAttempt + 1);
      }

      // NFT token IDs basically
      return data;
    }
  };

  const getNFTsMetadata = async (NFTS) => {
    let a = [];
    const NFTsMetadata = await Promise.allSettled(
      NFTS.map(async (NFT) => {
        try {
          const response = await fetch(
            `${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
          )
          console.log(response)
          const jsonData = await response.json();
          const b = {
            name: jsonData.metadata.name,
            description: jsonData.metadata.description,
            id: jsonData.id.tokenId.charAt(3),
          }
          a.push(b);
          // results.push(data.metadata);
          console.log("Metadata Acquired from Alchemy")
        }
        catch (error) {
          console.log("Error in acquiring metadata from Alchemy API", error)
        }
      })
    )
    return a;
  };

  const fetchNFTs = async (owner, contractAddress) => {
    const data = await getAddressNFTs(owner, contractAddress);
    console.log("Total NFTs owned: ", data.ownedNfts.length)
    if (data.ownedNfts.length > 0) {
      let results = await getNFTsMetadata(data.ownedNfts);
      console.log("Results Acquired");
      setNfts(results);
      setLoading(false)

    } else if (data.ownedNfts.length == 0) {
      console.log("NO NFTS FOUND");
      toast("No NFT found :(")
      setLoading(false)
    }
    else {
      console.log("API Error 😞")
    }
  };

  

  useEffect(() => {
    // get userAccount from localStorage
    const userAccount = localStorage.getItem('userAccount');
    setLoading(true)
    fetchNFTs(userAccount, NFT_CONTRACT_ADDRESS);
    // setLoading(false)
  }, [])


  const imagesObject = {
    'New Delhi': "./delhi.jpg",
    'Agra': "./agra.jpg",
    'Mumbai': "./mumbai.jpg",
    'Manali' : "./manali.jpg",
    'Jaipur': "./jaipur.jpg",
    'Goa': "./goa.jpg",
    'Ethernals': "./ethernals.jpg"
  }



  return (
    <div>
      <Nav />
      <ToastContainer />
      <div className={styles.container}>
          <span>Your NFTs 🎉</span>
          <div className={styles.inner}>
      { 
        loading ? <Loader /> 
        :
          nfts && nfts.map((nft, index) => {
            const oslink = `https://testnets.opensea.io/assets/mumbai/${NFT_CONTRACT_ADDRESS}/${nft.id}`
            console.log(nft.id)
            if (nft.name == undefined) {
              toast("Inappropriate data from Alchemy API. Try again. :(")
            }
            return (
              <div className={styles.card} key={index}>
                {/* <p className={styles.desc}>{nft['description']}</p> */}
                <img className={styles.nft} src={imagesObject[nft.name]} alt="nft" />
                <span className={styles.name}>{nft.name}</span>
                <span><Link href={oslink}><a className={styles.openlink} target="_blank">OpenSea Link 🔗</a></Link></span>
              </div>
          )
        })
      }
      </div>
      </div>
    </div>
  )
}


