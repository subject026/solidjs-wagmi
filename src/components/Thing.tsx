import { useCounter } from "../hooks/useCounter";

export default function Thing() {
  const { count, increment, decrement } = useCounter();

  return (
    <h2 class="text-2xl font-bold">
      {count()}
      <button class="px-4 py-2 bg-blue-700" onClick={() => increment()}>
        increment
      </button>

      <button class="px-4 py-2 bg-blue-700" onClick={() => decrement()}>
        decrement
      </button>
    </h2>
  );
}
