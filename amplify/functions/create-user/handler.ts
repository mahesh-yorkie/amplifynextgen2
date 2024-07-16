import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Amplify!'+ process.env.AMPLIFY_BRANCH }),
  };
  //return 'Hello, create user!' + process.env.AMPLIFY_BRANCH;
};