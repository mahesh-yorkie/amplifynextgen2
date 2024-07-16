import { defineFunction } from "@aws-amplify/backend"

export const addAdminUser = defineFunction({
  name: "add-admin-user",
  environment: {
    NAME: "World",
    API_ENDPOINT: process.env.AWS_REGION,
    AMPLIFY_AUTH_USERPOOL_ID: process.env.AMPLIFY_AUTH_USERPOOL_ID,
  }
})