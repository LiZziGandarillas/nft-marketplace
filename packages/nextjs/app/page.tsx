"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import Carousel from "~~/components/Carousel";
import ClearImage from "~~/components/cards/ClearImage";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <Carousel/>
      <div className="grid grid-cols-4 gap-4 p-5">
          <ClearImage tokenId={0} address={connectedAddress}/>
          <ClearImage tokenId={1} address={connectedAddress}/>
      </div>
      
    </>
  );
};

export default Home;
