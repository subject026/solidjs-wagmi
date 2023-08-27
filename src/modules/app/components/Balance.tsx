import { connect, getAccount } from "@wagmi/core";
import { useWagmiConfig } from "../../../hooks/providers/WagmiProvider";
import { Show, createEffect } from "solid-js";
import { disconnect } from "@wagmi/core";

function useConnectedUser() {
  const { isConnected, config, checkIsConnected } = useWagmiConfig();

  async function handleConnect() {
    try {
      const result = await connect({
        connector: config().connectors[0],
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
  return { handleConnect, handleDisconnect, isConnected };
}

export function Balance() {
  const { isConnected, handleConnect, handleDisconnect } = useConnectedUser();
  return (
    <article>
      <div>
        <Show when={isConnected()}>
          Balance {isConnected() ? "Connected" : "Not Connected"}
        </Show>
      </div>
      <button onClick={() => handleDisconnect()}>Disconnect</button>
      <button onClick={() => handleConnect()}>Connect</button>
    </article>
  );
}
