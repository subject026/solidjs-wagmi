import { GraphQLClient } from "graphql-request";

export const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/breadchaincoop/bread-polygon";

export const graphQLClient = new GraphQLClient(SUBGRAPH_URL);
