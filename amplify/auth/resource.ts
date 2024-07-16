import { defineAuth } from '@aws-amplify/backend';
import { customMessage } from "./custom-message/resource";

import { addAdminUser } from "../data/add-admin-user/resource"

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    customMessage,
  },

  access: (allow) => [
    allow.resource(addAdminUser).to(["addUserToGroup","manageUsers"])
  ],
});
