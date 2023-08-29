import {
  For,
  JSX,
  Match,
  Show,
  Suspense,
  Switch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import Layout from "../layouts/Layout";
import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";
import { GraphQLClient, gql } from "graphql-request";
import useWeeklyBread from "../hooks/useWeeklyBread";
import useProtocols from "../modules/chart/hooks/useProtocols";
import { WagmiProvider } from "../hooks/providers/WagmiProvider";
import { Protocols } from "../modules/chart/components/Protocols";

const queryClient = new QueryClient();

export function App() {
  const { data } = useProtocols();

  return (
    <WagmiProvider>
      <Layout>
        <div class="p-4 flex flex-col gap-2">
          <Show when={data()}>{(data) => <Protocols data={data()} />}</Show>
        </div>
      </Layout>
    </WagmiProvider>
  );
}

export default function AppIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
