"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Carousel from "~~/components/Carousel";
import ClearImage from "~~/components/cards/ClearImage";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <Carousel />
      <div className="flex flex-wrap gap-4 p-5">
        <ClearImage tokenId={0} address={connectedAddress} />
        <ClearImage tokenId={1} address={connectedAddress} />
      </div>
    </>
  );
};

export default Home;
