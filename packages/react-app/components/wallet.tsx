import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";



const WalletInfo = () => {
    const { address, isConnected } = useAccount();
    const [userBalance, setUserBalance] = useState("");

    useEffect(() => {
        if (isConnected && address) {
            setUserBalance(address);
        }
    }, [address, isConnected]);

    const handleBuy = () => {
        // Implement buy logic here
    };

    const handleSell = () => {
        // Implement sell logic here
    };

    return (
        <div className="wallet-info">
            <div className="address">Your Wallet Address: {userBalance}</div>
            <button className="buy-btn" onClick={handleBuy}>Buy</button>
            <button className="sell-btn" onClick={handleSell}>Sell</button>
            <div className="transactions">
                <h2>Transaction History</h2>
                <ul>
                    {/* Add your transaction history items here */}
                </ul>
            </div>
        </div>
    );
};

export default WalletInfo;
