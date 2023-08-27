import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
  createEffect,
} from "solid-js";
import {
  InjectedConnector,
  configureChains,
  connect,
  createConfig,
  getAccount,
} from "@wagmi/core";
import { polygon, polygonMumbai } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
  webSocketPublicClient,
});

// export type WagmiContextType = typeof config;

export type WagmiContextType = {
  isConnected: Accessor<boolean>;
  config: Accessor<typeof wagmiConfig>;
  checkIsConnected: () => void;
  // increment: Setter<undefined>;
  // decrement: Setter<undefined>;
};

const WagmiContext = createContext<WagmiContextType>();

export function WagmiProvider(props: { children: JSX.Element }) {
  const [isConnected, setIsConnected] = createSignal(false);
  const [config, setConfig] = createSignal(wagmiConfig);

  // const counter = {
  //   count,
  //   increment(): undefined {
  //     setCount((c) => c + 1);
  //   },
  //   decrement(): undefined {
  //     setCount((c) => c - 1);
  //   },
  // };

  async function checkIsConnected() {
    const account = await getAccount();
    setIsConnected(account.isConnected);
  }

  createEffect(() => {
    checkIsConnected();
  });

  return (
    <WagmiContext.Provider
      value={{
        config,
        isConnected,
        checkIsConnected,
      }}
    >
      {props.children}
    </WagmiContext.Provider>
  );
}

export function useWagmiConfig() {
  return useContext(WagmiContext)!;
}
