import { defineFunction ,secret} from '@aws-amplify/backend';

export const crearteUser = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'create-user',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    NAME: "World",
    API_ENDPOINT: process.env.ENV
  }
});