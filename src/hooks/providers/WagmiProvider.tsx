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
import { polygon, polygonMumbai, localhost } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { SafeConnector } from "@wagmi/core/connectors/safe";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai, localhost],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
    new SafeConnector({
      chains,
      options: {
        debug: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// export type WagmiContextType = typeof config;

export type WagmiContextType = {
  user: Accessor<ConnectedUserState>;
  config: Accessor<typeof wagmiConfig>;
  checkIsConnected: () => void;
  // increment: Setter<undefined>;
  // decrement: Setter<undefined>;
};

const WagmiContext = createContext<WagmiContextType>();

type ConnectedUserState = null | {
  address: `0x${string}`;
};

export function WagmiProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createSignal<ConnectedUserState>(null);
  const [config] = createSignal(wagmiConfig);

  async function checkIsConnected() {
    const account = await getAccount();
    if (account && account.address) {
      setUser({
        address: account.address,
      });
    } else {
      setUser(null);
    }
  }

  createEffect(() => {
    checkIsConnected();
  });

  return (
    <WagmiContext.Provider
      value={{
        config,
        user,
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
