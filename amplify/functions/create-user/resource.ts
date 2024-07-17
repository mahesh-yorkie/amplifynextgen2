import { defineFunction ,secret} from '@aws-amplify/backend';


const ENV: string = process.env.ENV || 'dev';

export const crearteUser = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'create-user',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment:{
    ENV:ENV
  }
});