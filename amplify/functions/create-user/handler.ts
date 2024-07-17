import type { Handler } from 'aws-lambda';
import { env } from '$amplify/env/create-user';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  return JSON.stringify({
    statusCode: 200,
    message: `Hello, ${env.API_ENDPOINT}!`,
    event: event,
  });
  //return 'Hello, create user!' + process.env.AMPLIFY_BRANCH;
};