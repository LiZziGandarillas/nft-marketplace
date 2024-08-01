import React, { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

function ClearImage(props: any) {
  const { tokenId, address } = props;
  const { data: tokenURI } = useScaffoldReadContract({
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
    if (tokenURI) {
      fetch(tokenURI)
        .then(response => response.json())
        .then(json => setCardInfo(json))
        .catch(error => console.error("Error fetching NFT data:", error));
    }
  }, [tokenURI]);

  const isOwner = nftOwner === address;

  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={cardInfo.image} alt={cardInfo.name || "NFT Image"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{cardInfo.name}</h2>
          <p>{cardInfo.description}</p>
          <div className="card-actions justify-end">
            {!isOwner && <button className="btn btn-primary">Comprar</button>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClearImage;
