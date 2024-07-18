import type { Handler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

const allowedGroupList = ["SUPERADMIN", "ADMIN", "WORKER", "CUSTOMER"];

interface EventArguments {
  email: string;
  user_pool_id: string;
  userGroupList: string[];
}

interface Event {
  arguments: EventArguments;
}

export const handler: Handler = async (event: Event) => {
  const { email, user_pool_id, userGroupList } = event.arguments;

  if (!email || !user_pool_id || !userGroupList) {
    const missingFields: string[] = [];
    if (!email) missingFields.push("email");
    if (!user_pool_id) missingFields.push("user_pool_id");
    if (!userGroupList) missingFields.push("userGroupList");

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Missing required arguments: ${missingFields.join(", ")}`,
      }),
    };
  }

  const invalidGroups = userGroupList.filter(
    (group) => !allowedGroupList.includes(group)
  );
  if (invalidGroups.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Invalid group names: ${invalidGroups.join(", ")}`,
      }),
    };
  }

  try {
    const params: AdminCreateUserCommandInput = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
      ],
      TemporaryPassword: "Test@123",
      DesiredDeliveryMediums: ["EMAIL"],
    };

    const createUserCommand = new AdminCreateUserCommand(params);
    const result = await cognitoClient.send(createUserCommand);

    if (userGroupList.length > 0) {
      await Promise.all(
        userGroupList.map(async (groupName) => {
          const addUserToGroupCommand = new AdminAddUserToGroupCommand({
            GroupName: groupName,
            UserPoolId: user_pool_id,
            Username: email,
          });
          await cognitoClient.send(addUserToGroupCommand);
        })
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User created successfully",
        user: result.User,
      }),
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
