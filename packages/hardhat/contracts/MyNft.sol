/// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNft is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("CursoSolidity2024ETHB", "MTK")
        Ownable()
    {
        transferOwnership(initialOwner);
        mintInitialTokens();
    }

    function mintInitialTokens() internal onlyOwner {
        _mintAndSetURI(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://emerald-working-owl-716.mypinata.cloud/ipfs/QmUfxqsbhZVcMX3MnKwv632EpCRXSQB5fb1xxAjkywwadT");
        _mintAndSetURI(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://emerald-working-owl-716.mypinata.cloud/ipfs/Qmdu2owj9iD4z6dQPAEKPmUAtFz4pDoGpUzfx1zYqyFvME");
    }

    function _mintAndSetURI(address to, string memory uri) internal {
        safeMint(to, uri);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override (ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function buyNFT(uint256 tokenId) public payable {
        require(msg.value >= 0.1 ether, "Insufficient payment");
        address owner = ownerOf(tokenId);
        require(owner != msg.sender, "Cannot buy your own NFT");
        
        _transfer(owner, msg.sender, tokenId);
    }
}