import type { Handler } from 'aws-lambda';
import {secret} from '@aws-amplify/backend';
//import { env } from '$amplify/env/create-member';
import { CognitoIdentityProviderClient, AdminCreateUserCommand ,AdminCreateUserCommandInput} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

interface CreateUserParams {
  userPoolId: string;
  username: string;
  email: string;
}

export const handler: Handler = async (event, context) => {
  const { email,user_pool_id } = event.arguments;

  if (!email || !user_pool_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required arguments' ,email:email,user_pool_id:user_pool_id}),
    };
  }

  try {
    const params: AdminCreateUserCommandInput = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      TemporaryPassword: "Test@123",
      MessageAction: 'SUPPRESS',
      DesiredDeliveryMediums: [ // DeliveryMediumListType
        "EMAIL",
      ],
    };

    const command = new AdminCreateUserCommand(params);
    const result = await cognitoClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User created successfully', user: result.User }),
    };
   
  } catch (error :any) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
