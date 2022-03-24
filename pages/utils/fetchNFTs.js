const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;


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

// function to get METADATA of NFTs user owned
const getNFTsMetadata = async (NFTS) => {
  const NFTsMetadata = await Promise.allSettled(
    NFTS.map(async (NFT) => {
      const metadata = await fetch(
        `${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then((data) => data.json());
      let imageUrl;
      console.log("metadata", metadata);
      if (metadata.media[0].uri.gateway.length) {
        imageUrl = metadata.media[0].uri.gateway;
      } else {
        imageUrl = "https://via.placeholder.com/500";
      }

      return {
        id: NFT.id.tokenId,
        contractAddress: NFT.contract.address,
        image: imageUrl,
        title: metadata.metadata.name,
        description: metadata.metadata.description,
        attributes: metadata.metadata.attributes,
      };
    })
  );

  return NFTsMetadata;
};

// function to fetch NFTs user owned. it calls getAddressNFTs & getNFTsMetadata functions. if address has 1 or more NFT then it will call getNFTsMetadata function to call metadata of NFT
const fetchNFTs = async (owner, contractAddress, setNFTs) => {
  const data = await getAddressNFTs(owner, contractAddress);
  if (data.ownedNfts.length) {
    const NFTs = await getNFTsMetadata(data.ownedNfts);
    let fullfilledNFTs = NFTs.filter((NFT) => NFT.status === "fulfilled");
    setNFTs(fullfilledNFTs);
  } else {
    setNFTs(null);
  }
};

export { fetchNFTs };