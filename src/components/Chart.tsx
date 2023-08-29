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

async function getChart() {
  const d3 = await import("d3");
  d3.select("#chart-container").append("h1").text("whooooooo");
}
const queryClient = new QueryClient();

export function App() {
  const { data } = useProtocols();

  onMount(() => {
    getChart();
  });

  return (
    <WagmiProvider>
      <Layout>
        <div class="p-4 flex flex-col gap-2">
          <Show when={data()}>
            {(data) => {
              console.log("data()", data());

              return data().map((protocol) => {
                console.log(protocol);
                return (
                  <article class=" bg-neutral-800 rounded p-4 flex gap-4">
                    <div class="w-12 h-12 rounded-full overflow-clip">
                      <img src={protocol.logo} alt="" />
                    </div>
                    <h3 class="font-medium text-lg">{protocol.name}</h3>
                  </article>
                );
              });
            }}
          </Show>
        </div>

        <section>
          <div id="chart-container"></div>
        </section>
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
