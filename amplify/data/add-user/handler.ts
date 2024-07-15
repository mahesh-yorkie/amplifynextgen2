import type { Schema } from "../resource";
import { env } from "$amplify/env/add-user";
import {
  AdminCreateUserCommand,
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["addAdminUser"]["functionHandler"];
const client = new CognitoIdentityProviderClient({ region: env.AWS_REGION });

export const handler: Handler = async (event) => {
  console.log("testing");
  const { email, groupList } = event.arguments;

  const argAdminCreateUser = {
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    Username: email,
    TemporaryPassword: `A${Math.random().toString(36).slice(2)}@0`,
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };

  const createUserCommand = new AdminCreateUserCommand(argAdminCreateUser);
  const response: { user?: any; groups?: any[] } = {};

  try {
    response.user = await client.send(createUserCommand);

    response.groups = [];
    for (const groupToAdd of groupList) {
      const addUserToGroupCommand = new AdminAddUserToGroupCommand({
        Username: email,
        GroupName: groupToAdd,
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
      });
      const groupResponse = await client.send(addUserToGroupCommand);
      response.groups.push(groupResponse);
    }
  } catch (error) {
    console.error("Error creating user or adding to groups:", error);
    throw error;
  }

  return response;
};
