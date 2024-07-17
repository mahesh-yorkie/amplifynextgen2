import { defineFunction ,secret} from '@aws-amplify/backend';

interface Environment {
  NAME: string;
  API_ENDPOINT: string | undefined;
}

const environment: Environment = {
  NAME: "World",
  API_ENDPOINT: process.env.API_ENDPOINT
};
export const crearteUser = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'create-user',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: environment
});