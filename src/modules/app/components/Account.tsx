import {
  connect,
  createConfig,
  getAccount,
  getConfig,
  readContract,
} from "@wagmi/core";
import { useWagmiConfig } from "../../../hooks/providers/WagmiProvider";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { disconnect } from "@wagmi/core";
import Button from "../../core/components/Button";
import Balance from "./Balance";

export function useConnectedUser() {
  // const [user, setUser] = createSignal<null | string>(null);
  const { user, checkIsConnected } = useWagmiConfig();

  async function handleConnect() {
    const config = getConfig();
    console.log(config);
    try {
      console.log(config.connectors);
      const result = await connect({
        connector: config.connectors[0],
      });
      checkIsConnected();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDisconnect() {
    try {
      await disconnect();
      checkIsConnected();
    } catch (error) {
      console.log(error);
    }
  }
  return { handleConnect, handleDisconnect, user };
}

export function Account() {
  const { user, handleConnect, handleDisconnect } = useConnectedUser();

  return (
    <article>
      <div>
        <Show when={!user()}>
          {(_) => <Button handleClick={() => handleConnect()}>Connect</Button>}
        </Show>

        <Show when={user()}>
          {(user) => (
            <>
              <Button handleClick={() => handleDisconnect()}>Disconnect</Button>
            </>
          )}
        </Show>
      </div>
    </article>
  );
}
