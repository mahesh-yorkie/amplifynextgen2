import type { Handler } from 'aws-lambda';
import { env } from '$amplify/env/create-user';

export const handler: Handler = async (event, context) => {
  
    const email: string | null = event.argument.email;
    if (email === null || email === undefined) {
      throw new Error('Email is not defined');
    }

    // return {
    //   status: 200,
    //   message: `Hello, ${env.API_ENDPOINT}!`,
    //   data: event.arguments
    // }

  return JSON.stringify({
    statusCode: 200,
    message: `Hello, ${env.API_ENDPOINT}!`,
    name: event.arguments.name,
  });
  //return 'Hello, create user!' + process.env.AMPLIFY_BRANCH;
};