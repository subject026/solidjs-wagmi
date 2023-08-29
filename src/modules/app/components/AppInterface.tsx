import { connect, getAccount, readContract } from "@wagmi/core";
import { useWagmiConfig } from "../../../hooks/providers/WagmiProvider";
import { Show } from "solid-js";
import { useConnectedUser } from "./Account";

export function AppInterface() {
  const { user } = useConnectedUser();

  return (
    <article>
      <div>
        <Show when={!user()}>
          <h1>please connect</h1>
        </Show>

        <Show when={user()}>
          {(user) => <ApproveContract address={user().address} />}
        </Show>
      </div>
    </article>
  );
}

function ApproveContract({ address }: { address: string }) {
  // check contract approval

  // Create approval transaction

  return (
    <section>
      <div>address: {address}</div>
    </section>
  );
}
