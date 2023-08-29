import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
  createEffect,
  onMount,
  ParentComponent,
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

function createWagmiContext() {
  const [user, setUser] = createSignal<ConnectedUserState>(null);
  const [config] = createSignal(wagmiConfig);

  onMount(() => {
    checkIsConnected();
  });

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

  return { user, config, checkIsConnected };
}

const WagmiContext = createContext<ReturnType<typeof createWagmiContext>>();

type ConnectedUserState = null | {
  address: `0x${string}`;
};

export const WagmiProvider: ParentComponent = (props) => {
  console.log("provider!");
  const { user, config, checkIsConnected } = createWagmiContext();
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
};

export function useWagmiConfig() {
  const context = useContext(WagmiContext);
  if (!context) throw new Error("must be used inside wagmi provider!");
  return context;
}
