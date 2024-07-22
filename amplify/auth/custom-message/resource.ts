import { defineFunction } from "@aws-amplify/backend";
const ENVIRONMENT: string = process.env.ENV || "dev";
const FRONT_URL: string = process.env.FRONT_URL || "http://localhost:3000/"; // Provide a default or fallback URL
const _GRAPHQL_ENDPOINT =
  process.env.API_ENDPOINT ||
  "https://nzyoojposbft3ge2e56gt53xb4.appsync-api.us-west-2.amazonaws.com/graphql";
export const customMessage = defineFunction({
  name: "custom-message",
  environment: {
    ENVIRONMENT: ENVIRONMENT,
    FRONT_URL: FRONT_URL,
    GRAPHQL_ENDPOINT: _GRAPHQL_ENDPOINT,
  },
});
