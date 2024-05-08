import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi"; // Assuming this provides wallet-related functionality
import { buyCoins, sellCoins, fetchCoinData } from "./api"; // Import your API functions

const CoinTradingComponent = () => {
  const [userAddress, setUserAddress] = useState("");
  const [coinData, setCoinData] = useState([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
    // Fetch coin data from your graph API
    const fetchData = async () => {
      try {
        const data = await fetchCoinData();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBuy = async (coinId, amount) => {
    try {
      await buyCoins(userAddress, coinId, amount);
      // Optionally, update the coin data after buying
    } catch (error) {
      console.error("Error buying coins:", error);
    }
  };

  const handleSell = async (coinId, amount) => {
    try {
      await sellCoins(userAddress, coinId, amount);
      // Optionally, update the coin data after selling
    } catch (error) {
      console.error("Error selling coins:", error);
    }
  };

  return (
    <div>
      <h2>Coin Trading</h2>
      {isConnected ? (
        <>
          <p>Wallet Address: {userAddress}</p>
          <div>
            {coinData.map((coin) => (
              <div key={coin.id}>
                <p>{coin.name}</p>
                <p>Price: {coin.price}</p>
                <button onClick={() => handleBuy(coin.id, 1)}>Buy</button>
                <button onClick={() => handleSell(coin.id, 1)}>Sell</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Wallet Connected</p>
      )}
    </div>
  );
};

export default CoinTradingComponent;
