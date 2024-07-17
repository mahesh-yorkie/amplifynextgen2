import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  return JSON.stringify({
    statusCode: 200,
    message: 'Hello from Amplify!',
    env: process.env,
  });
  //return 'Hello, create user!' + process.env.AMPLIFY_BRANCH;
};