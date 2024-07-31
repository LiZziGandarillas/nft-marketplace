import React, { useEffect, useState } from 'react'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';

function ClearImage(props: any){
    const {tokenId, address} = props;
    const { data } = useScaffoldReadContract({
        contractName: "MyNft",
        functionName: "tokenURI",
        args: [tokenId],
    });
    const { data: nftOwner } = useScaffoldReadContract({
        contractName: "MyNft",
        functionName: "ownerOf",
        args: [tokenId],
    });
    const[url, setUrl] = useState<string | undefined>("")
    const[CardInfo, setCardInfo] = useState({
        image:"",
        name:"",
        description:""
    })

    setUrl(data);

    useEffect(()=>{
        if(url) {
            fetch(url)
                .then(response=>response.json())
                .then(json=>setCardInfo(json))
                .then(error=>console.error(error))
        }
    },[url])

    console.log({url});
 
    return(
        <>
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={CardInfo.image}
                alt="Cat" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{CardInfo.name}</h2>
                <p>{CardInfo.description}</p>
                <div className="card-actions justify-end">
                {address != nftOwner &&<button className="btn btn-primary">Comprar</button>}
                </div>
            </div>
        </div>
        </>
    )
}

export default ClearImage;