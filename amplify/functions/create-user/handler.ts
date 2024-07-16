import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  return 'Hello, create user!' + process.env.AWS_BRANCH;
};