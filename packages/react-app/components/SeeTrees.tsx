import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import WalletInfo from "../components/wallet";


// Initialize your contract instance here
// const contract = new web3.eth.Contract(TreeStewardshipContract.abi, 'deployed_contract_address');

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const [treeId, setTreeId] = useState('');
    const [price, setPrice] = useState('');
    const [newSteward, setNewSteward] = useState('');
    const result = useBalance({
         address: userAddress as `0x${string}`
      })

      console.log(result)
    //const { balance, loading: balanceLoading } = useBalance(address); // Fetch user's balance

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    useEffect(() => {
        if (isMounted) {
            // Load trees or perform any other initialization here
            loadTrees();
        }
    }, [isMounted]);

    const loadTrees = async () => {
        try {
            // Call your contract methods to fetch tree data here
            // Example: const totalTrees = await contract.methods.totalTrees().call();
            // Implement your logic to fetch tree data
        } catch (error) {
            console.error('Failed to load trees', error);
        }
    };

   
    const sellTree = async (treeId: string, price: string) => {
        try {
            // Example: await contract.methods.sellTree(treeId, price).send({ from: (await web3.eth.getAccounts())[0] });
            // Reload trees after selling
            loadTrees();
        } catch (error) {
            console.error('Failed to sell tree', error);
        }
    };

  

    if (!isMounted) {
        return null; // You might want to show a loading indicator here instead
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {/* Your existing UI components */}
          

            {/* Sell Tree Form */}
            <div className="mb-4">
                <input type="number" className="border p-2" value={treeId} onChange={(e) => setTreeId(e.target.value)} placeholder="Enter Tree ID" />
                <input type="number" className="border p-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => sellTree(treeId, price)}>Sell Tree</button>
            </div>

          
            {isConnected ? (
    <div className="h2 text-center">
        <h2>
            Your address: {userAddress}
        </h2>
        <WalletInfo /> {/* Include WalletInfo component here */}
    </div>
) : (
    <div>No Wallet Connected</div>
)}

        </div>
    );
}
