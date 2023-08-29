import {
  For,
  JSX,
  Match,
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
    <Layout>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
      {/* <Switch>
        <Match when={query.isLoading}>
          <p>Loading...</p>
        </Match>

        <Match when={query.isSuccess}>
          <pre>{JSON.stringify(query.data, null, 2)}</pre>
          <For each={query.data}>
            {(snapshot) => <p>{snapshot.weeklyTotalSupply}</p>}
          </For>
        </Match>
      </Switch>

      <Suspense fallback={"Loading..."}>
        <For each={query.data}>
          {(snapshot) => <div>{snapshot.weeklyTotalSupply}</div>}
        </For>
      </Suspense> */}
      <section>
        <div id="chart-container"></div>
      </section>
    </Layout>
  );

  //   const query = createQuery(
  //     () => ["repoData"],
  //     () =>
  //       fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
  //         (res) => res.json()
  //       )
  //   );

  //   // ✅ access query properties in JSX reactive context
  //   return (
  //     <Switch>
  //       <Match when={query.isLoading}>Loading...</Match>
  //       {/* <Match when={query.isError}>Error: {query.error.message}</Match> */}
  //       <Match when={query.isSuccess}>
  //         <div>
  //           <h1>{query.data.name}</h1>
  //           <p>{query.data.description}</p>
  //           <strong>👀 {query.data.subscribers_count}</strong>{" "}
  //           <strong>✨ {query.data.stargazers_count}</strong>{" "}
  //           <strong>🍴 {query.data.forks_count}</strong>
  //         </div>
  //       </Match>
  //     </Switch>
  //   );
}

export default function AppIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
