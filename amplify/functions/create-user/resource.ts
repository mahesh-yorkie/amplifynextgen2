import { defineFunction ,secret} from '@aws-amplify/backend';


const API_ENDPOINT: string | undefined = process.env.ENV;
// Define the type for environment variables
interface Environment {
  NAME: string;
  API_ENDPOINT: string | undefined;
}

// Create the environment object
const environment: Record<string, string | undefined> = {
  NAME: "World",
  API_ENDPOINT:API_ENDPOINT
};


export const crearteUser = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'create-user',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment
});