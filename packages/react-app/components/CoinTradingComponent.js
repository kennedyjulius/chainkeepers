// CoinTradingComponent.js
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { buyCoins, sellCoins, fetchCoinData, fetchTransactionHistory } from "./api";

const CoinTradingComponent = () => {
  const [userAddress, setUserAddress] = useState("");
  const [coinData, setCoinData] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
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
      // Optionally, update the coin data and transaction history after buying
    } catch (error) {
      console.error("Error buying coins:", error);
    }
  };

  const handleSell = async (coinId, amount) => {
    try {
      await sellCoins(userAddress, coinId, amount);
      // Optionally, update the coin data and transaction history after selling
    } catch (error) {
      console.error("Error selling coins:", error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await fetchTransactionHistory(userAddress);
        setTransactionHistory(history);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchHistory();
  }, [userAddress]);

  return (
    <div>
      <h2>Coin Trading</h2>
      {isConnected? (
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
          <div>
            <h3>Transaction History</h3>
            {transactionHistory.map((transaction) => (
              <div key={transaction.id}>
                <p>Transaction ID: {transaction.id}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Timestamp: {transaction.timestamp}</p>
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
