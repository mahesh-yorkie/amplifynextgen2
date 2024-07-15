import type { Schema } from "../resource"
import { env } from "$amplify/env/add-user"
import {
  AdminCreateUserCommand
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["addAdminUser"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {
  console.log("testing")
  const { email, groupList } = event.arguments

  const argAdminCreateUser = {
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
      Username: email,
      TemporaryPassword: `A${Math.random().toString(36).slice(2)}@0`,
      DesiredDeliveryMediums: ["EMAIL"],
      UserAttributes: [
          {
              Name: "email",
              Value: email
          },
          {
              Name: "email_verified",
              Value: "true"
          }
      ]
  }

  const command = new AdminCreateUserCommand(input);
  let response["user"] = await client.send(command);

  for (const groupToAdd of groupList) {
    const command = new AdminAddUserToGroupCommand({
      Username: email,
      GroupName: groupToAdd,
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    })
    response['group'] = await client.send(command)

  }
  
  return response
}