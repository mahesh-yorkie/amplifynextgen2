import { defineFunction ,secret} from '@aws-amplify/backend';


const API_ENDPOINT: string = process.env.ENV || 'default_endpoint';



export const crearteUser = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'create-user',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment:{
    API_ENDPOINT:API_ENDPOINT
  }
});