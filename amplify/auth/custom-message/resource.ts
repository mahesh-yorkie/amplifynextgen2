import { defineFunction } from "@aws-amplify/backend";
const ENVIRONMENT: string = process.env.ENV || "dev";
const FRONT_URL: string = process.env.FRONT_URL || "http://localhost:3000/"; // Provide a default or fallback URL

export const customMessage = defineFunction({
  name: "custom-message",
  environment: {
    ENVIRONMENT: ENVIRONMENT,
    FRONT_URL: FRONT_URL,
  },
});