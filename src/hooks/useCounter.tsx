import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
} from "solid-js";

export type CounterContextType = {
  count: Accessor<number>;
  increment: Setter<undefined>;
  decrement: Setter<undefined>;
};

const CounterContext = createContext<CounterContextType>();

export function CounterProvider(props: { children: JSX.Element }) {
  const [count, setCount] = createSignal(0);

  const counter = {
    count,
    increment(): undefined {
      setCount((c) => c + 1);
    },
    decrement(): undefined {
      setCount((c) => c - 1);
    },
  };

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext)!;
}
