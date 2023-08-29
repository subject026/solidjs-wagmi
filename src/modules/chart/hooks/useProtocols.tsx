const ENDPOINT = "https://api.llama.fi/protocols"

import { createEffect, createSignal } from "solid-js";
import { graphQLClient } from "../../chart/graphqlClient";
import { createQuery } from "@tanstack/solid-query";

async function fetchProtocols() {
  const res = await fetch(ENDPOINT);
  const data = await res.json()
  console.log("data.length: ", data.length);
  return data;
}

export default function useProtocols() {
  const [data, setData] = createSignal([]);
  const [status, setStatus] = createSignal<
    "success" | "loading" | "error" | null
  >(null);

  const query = createQuery(
    () => ["protocols"],
    () => fetchProtocols()
  );

  createEffect(() => {
    setStatus(query.status);
    if (query.data?.length) {
      setData(() => query.data);
    }
  });

  return { data, status };
}
