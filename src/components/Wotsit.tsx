import { createEffect } from "solid-js";
import { CounterContextType, useCounter } from "../hooks/useCounter";
import { useWagmiConfig } from "../hooks/providers/WagmiProvider";

export default function Account() {
  const { count, increment, decrement } = useCounter();

  const { isConnected } = useWagmiConfig();

  return (
    <section>
      <h2 class="text-2xl font-bold">
        is connected: {isConnected() ? "connected" : "not connected"}
      </h2>

      {count()}
      <button class="px-4 py-2 bg-blue-700" onClick={() => increment()}>
        increment
      </button>

      <button class="px-4 py-2 bg-blue-700" onClick={() => decrement()}>
        decrement
      </button>
    </section>
  );
}
