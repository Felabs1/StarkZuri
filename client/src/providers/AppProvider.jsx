import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { connect, disconnect } from "starknetkit-latest";
import { Contract, Provider, constants } from "starknet";
import { ABI, CONTRACT_ADDRESS } from "./abi";
import { NODE_URL, provider as SProvider } from "../utils/constants";

const initialData = {
  address: null,
  contract: null,
  provider: null,
  viewUser: null,
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
    try {
      const { wallet } = await connect({
        provider: SProvider,
        modalMode: "alwaysAsk",
        webWalletUrl: "https://web.argent.xyz",
        argentMobileOptions: {
          dappName: "Starknetkit example dapp",
          url: window.location.hostname,
          chainId: "SN_SEPOLIA",
          icons: [],
        },
      });

      if (wallet && wallet.isConnected) {
        setProvider(wallet.account);
        setAddress(wallet.account.address);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      const { wallet } = await disconnect();
      if (wallet && wallet.isConnected) {
        setProvider(undefined);
        setAddress("");
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const viewUser = (address) => {
    if (!contract) return;

    try {
      const myCall = contract.populate("view_user", [address]);
      return contract["view_user"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("view_user", res?.result ?? res);
          console.log(val);
          return val;
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    } catch (error) {
      console.error("Error viewing user:", error);
    }
  };

  const connectContract = () => {
    try {
      // if (address && provider) {
      //   const _contract = new Contract(ABI, CONTRACT_ADDRESS, provider);
      //   if (_contract) {
      //     setContract(_contract);
      //   }
      // } else {
      //   const _provider = new Provider({
      //     // sequencer: { network: constants.NetworkName.SN_SEPOLIA },
      //     nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
      //   });
      //   const _contract = new Contract(ABI, CONTRACT_ADDRESS, _provider);
      //   setContract(_contract);
      // }
      const _provider = new Provider({
        // sequencer: { network: constants.NetworkName.SN_SEPOLIA },
        nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
      });
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, _provider);
      setContract(_contract);
      console.log(_contract);
    } catch (error) {
      console.error("Error connecting to contract:", error);
    }
  };

  const appValue = useMemo(
    () => ({
      address,
      contract,
      provider,
      viewUser,
      handleWalletConnection: connectWallet,
      handleWalletDisconnection: disconnectWallet,
    }),
    [address, contract, provider]
  );

  useEffect(() => {
    const connectToStarknet = async () => {
      const { wallet, connectorData } = await connect({
        modalMode: "neverAsk",
      });
      console.log(wallet, ".....................");

      if (wallet && wallet.isConnected) {
        setProvider(wallet.account);
        setAddress(wallet.account.address);
      }
    };

    // connectToStarknet();
    connectContract();
  }, [address]);

  return (
    <AppContext.Provider value={appValue}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
