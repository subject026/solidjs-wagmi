const ENDPOINT = "https://api.llama.fi/protocols";

import { createEffect, createSignal } from "solid-js";
import { graphQLClient } from "../../chart/graphqlClient";
import { createQuery } from "@tanstack/solid-query";
import { z } from "zod";

const ZProtocols = z
  .object({
    name: z.string(),
    logo: z.string(),
  })
  .array();

async function fetchProtocols() {
  const res = await fetch(ENDPOINT);
  const data = await res.json();
  console.log("data.length: ", data.length);
  console.log("data[0]: ", data[0]);
  return ZProtocols.parse(data);
}

type ProtocolData = {
  [key: string]: string;
}[];

export default function useProtocols() {
  const [data, setData] = createSignal<null | ProtocolData>(null);
  const [status, setStatus] = createSignal<
    "success" | "loading" | "error" | null
  >(null);

  const query = createQuery<ProtocolData>(
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
