import React, { useEffect, useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

function ClearImage(props: any) {
  const { tokenId, address } = props;
  const { data: tokenURI, error: tokenURIError } = useScaffoldReadContract({
    contractName: "MyNft",
    functionName: "tokenURI",
    args: [tokenId],
  });
  const { data: nftOwner } = useScaffoldReadContract({
    contractName: "MyNft",
    functionName: "ownerOf",
    args: [tokenId],
  });
  const [cardInfo, setCardInfo] = useState({
    image: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (tokenURI && !tokenURIError) {
      fetch(tokenURI)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch token data");
          }
          return response.json();
        })
        .then(json => setCardInfo(json))
        .catch(error => console.error("Error fetching NFT data:", error));
    } else if (tokenURIError) {
      console.error("Error fetching tokenURI:", tokenURIError);
    }
  }, [tokenURI, tokenURIError]);

  const isOwner = nftOwner === address;
  
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MyNft");
  const [isBuying, setIsBuying] = useState(false);
  const handleBuyNFT = async () => {
    setIsBuying(true);
    try {
      await writeYourContractAsync({
        functionName: "buyNFT",
        args: [tokenId],
        value: BigInt(0.1 * 1e18),
      });
    } catch (e) {
      console.error("Error buying NFT:", e);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          {cardInfo.image ? (
            <img src={cardInfo.image} alt={cardInfo.name || "NFT Image"} />
          ) : (
            <p>No image available</p>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{cardInfo.name || "No name available"}</h2>
          <p>{cardInfo.description || "No description available"}</p>
          <p className="text-lg font-bold">
            Price: 0.1 ETH
          </p>
          <div className="card-actions justify-end">
            {!isOwner && <button className="btn btn-primary" onClick={handleBuyNFT} disabled={isBuying}>Comprar</button>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClearImage;
