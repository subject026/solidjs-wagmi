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
import SafeAppsSDK, {
  Opts as SDKOpts,
  SafeInfo,
} from "@safe-global/safe-apps-sdk";

export type SafeContextType = {
  sdk: Accessor<SafeAppsSDK>;
  safe: Accessor<SafeInfo>;
  connected: Accessor<boolean>;
};

const SafeContext = createContext<SafeContextType>();

export function SafeProvider(props: { children: JSX.Element }) {
  const [sdk] = createSignal(new SafeAppsSDK());
  const [connected, setConnected] = createSignal(false);
  const [safe, setSafe] = createSignal<SafeInfo>({
    safeAddress: "",
    chainId: 1,
    threshold: 1,
    owners: [],
    isReadOnly: true,
  });

  createEffect(() => {});

  return (
    <SafeContext.Provider
      value={{
        sdk,
        connected,
        safe,
      }}
    >
      {props.children}
    </SafeContext.Provider>
  );
}

export function useSafe() {
  return useContext(SafeContext)!;
}
