import { connect, getAccount, readContract } from "@wagmi/core";
import { useWagmiConfig } from "../../../hooks/providers/WagmiProvider";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { disconnect } from "@wagmi/core";
import Button from "../../core/components/Button";
import Balance from "./Balance";

function useConnectedUser() {
  const { user, config, checkIsConnected } = useWagmiConfig();

  async function handleConnect() {
    try {
      console.log(config().connectors);
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
  return { handleConnect, handleDisconnect, user };
}

export function Account() {
  const { user, handleConnect, handleDisconnect } = useConnectedUser();

  const [userHere, setUserHere] = createSignal();

  createEffect(() => {
    const updatedUser = user();

    console.log({ updatedUser });

    setUserHere(updatedUser);
  });

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
              <Balance holderAddress={user().address} />
            </>
          )}
        </Show>
      </div>
    </article>
  );
}
