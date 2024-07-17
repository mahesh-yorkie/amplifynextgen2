import type { Handler } from 'aws-lambda';
import {secret} from '@aws-amplify/backend';
//import { env } from '$amplify/env/create-member';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  const email = event.argument.email

  return {
    status: 200,
    message: `Hello,` + secret('branch'),
    data: event.argument,
  }
  
  // return JSON.stringify({
  //   statusCode: 200,
  //   message: `Hello, ${env.API_ENDPOINT}!`,
  //   event: event,
  // });
  //return 'Hello, create user!' + process.env.AMPLIFY_BRANCH;
};