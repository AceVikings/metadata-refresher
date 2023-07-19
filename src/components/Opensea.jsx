import React from "react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const chains = [
  { id: 1, name: "Ethereum Mainnet", unavailable: false },
  { id: 2, name: "Polygon Matic", unavailable: false },
  { id: 3, name: "Avalanche C Chain", unavailable: false, chain: "avalanche" },
  { id: 4, name: "BNB Chain", unavailable: true },
  { id: 5, name: "Arbitrum", unavailable: false },
  { id: 6, name: "Arbitrum Nova", unavailable: false },
  { id: 7, name: "Optimism", unavailable: false },
  { id: 8, name: "Solana", unavailable: false },
  { id: 9, name: "Zora", unavailable: false },
];

const Opensea = () => {
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  const [address, setAddress] = useState();
  const [tokenIds, setTokenIds] = useState({ startId: 0, endId: 1 });
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": `${import.meta.env.VITE_OPENSEA}`,
    },
  };

  const setIntialId = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setTokenIds((prev) => {
        return { ...prev, startId: e.target.value };
      });
    }
  };

  const setFinalId = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setTokenIds((prev) => {
        return {
          ...prev,
          endId: e.target.value,
        };
      });
    }
  };
  function refreshTokens() {
    for (let i = tokenIds.startId; i < tokenIds.endId; i++) {
      fetch(
        `https://api.opensea.io/v2/chain/${selectedChain.chain}/contract/${address}/nfts/${i}/refresh`,
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="text-gray-50 flex relative flex-col items-center py-4 rounded-md px-8 w-[28rem] border-gray-50 border">
      <h1 className="text-3xl font-bold">Opensea</h1>
      <Listbox value={selectedChain} onChange={setSelectedChain}>
        <Listbox.Button className="bg-gray-50 rounded-lg text-black w-40 font-semibold py-2 mt-4">
          {selectedChain.name}
        </Listbox.Button>
        <Listbox.Options className="bg-gray-50 absolute top-28 text-black rounded-lg cursor-pointer overflow-hidden">
          {chains.map((chain) => (
            <Listbox.Option
              className="px-4 py-2 hover:bg-gray-100"
              key={chain.id}
              value={chain}
              disabled={chain.unavailable}
            >
              {chain.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <label className="self-start mt-4">Contract Address</label>
      <input
        className="py-2 indent-1 w-full bg-black rounded-md border-gray-50 border focus-visible:outline-none"
        placeholder="0x"
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="flex mt-4 w-full">
        <div className="mr-2">
          <label>Start Id</label>
          <input
            className="py-2 indent-1 w-full bg-black rounded-md mr-2 border-gray-50 border focus-visible:outline-none"
            onChange={(e) => setIntialId(e)}
            value={tokenIds.startId}
          />
        </div>
        <div>
          <label>End Id</label>

          <input
            className="py-2 indent-1 w-full bg-black rounded-md border-gray-50 border focus-visible:outline-none"
            onChange={(e) => setFinalId(e)}
            value={tokenIds.endId}
          />
        </div>
      </div>
      <button
        className="bg-gray-50 text-black font-semibold px-4 py-2 rounded-lg mt-4"
        onClick={refreshTokens}
      >
        Refresh
      </button>
    </div>
  );
};

export default Opensea;
