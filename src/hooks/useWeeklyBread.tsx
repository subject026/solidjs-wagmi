import { createEffect, createSignal } from "solid-js";
import { graphQLClient } from "../modules/chart/graphqlClient";
import { createQuery } from "@tanstack/solid-query";
import { gql } from "graphql-request";

const TOKEN_WEEKLY_QUERY = gql`
  query TokenWeeklySnapshots($skip: Int, $first: Int) {
    tokenWeeklySnapshots(
      skip: $skip
      first: $first
      orderBy: timestamp
      orderDirection: desc
    ) {
      timestamp
      weeklyTotalSupply
    }
  }
`;

interface IQueryWeeklySnapshot {
  timestamp: string;
  weeklyTotalSupply: number;
}

async function fetchWeeklyBread() {
  const res = await graphQLClient.request<{
    tokenWeeklySnapshots: IQueryWeeklySnapshot[];
  }>(TOKEN_WEEKLY_QUERY);
  console.log({ res });
  return res.tokenWeeklySnapshots;
}

export default function useWeeklyBread() {
  const [data, setData] = createSignal<IQueryWeeklySnapshot[]>([]);
  const [status, setStatus] = createSignal<
    "success" | "loading" | "error" | null
  >(null);

  const query = createQuery<IQueryWeeklySnapshot[]>(
    () => ["weeklyBread"],
    () => fetchWeeklyBread()
  );

  createEffect(() => {
    setStatus(query.status);
    if (query.data?.length) {
      setData(() => query.data);
    }
  });

  return { data, status };
}
