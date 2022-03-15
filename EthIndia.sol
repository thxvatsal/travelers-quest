// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TravelGasless is ERC2771Context, ERC1155, Ownable { 
    // 0x49530D2952a8CF46d3362fd2813d407a1bFb234D    1 try
    uint256[] supplies = [50,50,50];
    uint256[] minted = [0,0,0,0];
    mapping(uint256 => mapping(address => bool)) public member;

    constructor(address trustedForwarder) 
        ERC1155("https://ipfs.io/ipfs/QmZNkDgivjBkXBSG5zVjt3vk6KfTzzSBowCRRoqMvcNahp/{id}.json")
        ERC2771Context(trustedForwarder) 
        {
        }

    // function setURI(string memory newuri) public onlyOwner {
    //     _setURI(newuri);
    // }

     function uri(uint256 _tokenId) override public view returns (string memory) {
        require(_tokenId <= supplies.length-1,"NFT does not exist");
        return string(
        abi.encodePacked(
            "https://ipfs.io/ipfs/QmZNkDgivjBkXBSG5zVjt3vk6KfTzzSBowCRRoqMvcNahp/",
            Strings.toString(_tokenId),
            ".json"
        )
        );
    }

     function mint(uint256 _tokenId) 
        public
        {
         require(
            !member[_tokenId][_msgSender()],
            "You have already claim NFT"
        );    
        require(_tokenId <= supplies.length-1,"NFT does not exist");
        uint256 index = _tokenId;

        require (minted[index] + 1 <= supplies[index], "All the NFT have been minted");
        _mint(_msgSender(), _tokenId, 1, "");
        // "" is data which is set empty
        minted[index] += 1;
        member[_tokenId][_msgSender()] = true;
    }

    function totalNftMinted(uint256 _tokenId) public view returns(uint256){
        return minted[_tokenId];
    }

    function _msgSender() internal view override(Context, ERC2771Context) returns (address){
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata){
        return ERC2771Context._msgData();
    }
}

