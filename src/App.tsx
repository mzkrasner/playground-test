import React from "react";
import { GraphiQL } from "graphiql";
import type { Fetcher } from "@graphiql/toolkit";
import "graphiql/graphiql.min.css";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from "@composedb/client";
import { definition } from "./definition.js";
import { RuntimeCompositeDefinition } from "@composedb/types";

const composeClient = new ComposeClient({
  ceramic: "https://ceramic-temp.hirenodes.io",
  // cast our definition as a RuntimeCompositeDefinition
  definition: definition as RuntimeCompositeDefinition,
});

const fetcher: Fetcher = async (graphQLParams) => {
  const data = await composeClient.executeQuery(`${graphQLParams.query}`);
  return data.data;
};

const App = () => <GraphiQL fetcher={fetcher} />;

export default App;
