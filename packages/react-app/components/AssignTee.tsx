import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import WalletInfo from "./wallet";



export default function Assign() {
    const { address, isConnected } = useAccount();
    const [treeId, setTreeId] = useState('');
    const [price, setPrice] = useState('');
    const [newSteward, setNewSteward] = useState('');

    const loadTrees = async () => {
        try {
            // Call your contract methods to fetch tree data here
            // Example: const totalTrees = await contract.methods.totalTrees().call();
            // Implement your logic to fetch tree data
        } catch (error) {
            console.error('Failed to load trees', error);
        }
    };
    const assignSteward = async (treeId: string, newSteward: string) => {
        try {
            // Example: await contract.methods.assignSteward(treeId, newSteward).send({ from: (await web3.eth.getAccounts())[0] });
            // Reload trees after assigning steward
            loadTrees();
        } catch (error) {
            console.error('Failed to assign steward', error);
        }
    };

    return(

        <div>
  {/* Assign Steward Form */}
  <div className="mb_4">
                <input type="number"  value={treeId} onChange={(e) => setTreeId(e.target.value)} placeholder="Enter Tree ID" />
                <input type="text" value={newSteward} onChange={(e) => setNewSteward(e.target.value)} placeholder="Enter New Steward Address" />
                <button onClick={() => assignSteward(treeId, newSteward)}>Assign Steward</button>
            </div>
        </div>
          
    );
}