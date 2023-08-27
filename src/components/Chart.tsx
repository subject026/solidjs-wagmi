import { createSignal, onMount } from "solid-js";

import aapl from "./aapl.json";
import Layout from "../layouts/Layout";

async function getChart() {
  const d3 = await import("d3");
  d3.select("#chart-container").append("h1").text("whooooooo");
}

export default function App() {
  const [count, setCount] = createSignal(0);

  onMount(() => {
    getChart();
  });

  return (
    <Layout>
      <section>
        <div id="chart-container"></div>
      </section>
    </Layout>
  );
}
