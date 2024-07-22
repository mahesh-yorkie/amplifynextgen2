import { defineFunction, secret } from "@aws-amplify/backend";

const API_ENDPOINT: string = process.env.ENV || "dev";

const GRAPHQL_ENDPOINT =
  process.env.API_ENDPOINT ||
  "https://nzyoojposbft3ge2e56gt53xb4.appsync-api.us-west-2.amazonaws.com/graphql";

export const createMember = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: "create-member",
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: "./handler.ts",
  environment: {
    API_ENDPOINT: API_ENDPOINT,
    GRAPHQL_ENDPOINT: GRAPHQL_ENDPOINT,
  },
});
