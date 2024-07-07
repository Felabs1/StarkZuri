import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { connect, disconnect } from "starknetkit";

import { Contract, Provider, Account, ec, json, constants } from "starknet";
import { ABI, CONTRACT_ADDRESS } from "./abi";
const initialData = {
  address: null,
  contract: null,
  provider: null,
  handleWalletConnection: null,
  handleWalletDisconnection: null,
};

const AppContext = createContext(initialData);
export const useAppContext = () => useContext(AppContext);
const AppProvider = (props) => {
  const [address, setAddress] = useState();
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();

  const connectWallet = async () => {
    const { wallet } = await connect();

    if (wallet && wallet.isConnected) {
      setProvider(wallet.account);
      setAddress(wallet.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    const { wallet } = await disconnect();
    if (wallet && wallet.isConnected) {
      // setConnection(undefined);
      setProvider(undefined);
      setAddress("");
    }
  };

  const connectContract = () => {
    if (address && provider) {
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, provider);
      if (_contract) {
        setContract(_contract);
      }
    } else {
      const _provider = new Provider({
        sequencer: { network: constants.NetworkName.SN_SEPOLIA },
      });
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, _provider);
      setContract(_contract);
      // console.log(_contract);
    }
  };

  const appValue = useMemo(
    () => ({
      address,
      contract,
      provider,
      handleWalletConnection: connectWallet,
      handleWalletDisconnection: disconnectWallet,
    }),
    [address, contract, provider]
  );
  useEffect(() => {
    connectContract();
  }, [address]);

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <AppContext.Provider value={appValue}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
