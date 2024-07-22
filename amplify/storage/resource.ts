import { defineFunction, defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "currentpools",
  access: (allow) => ({
    "profile-pictures/{user_id}/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
  triggers: {
    onUpload: defineFunction({
      entry: "./on-upload-handler.ts",
    }),
    onDelete: defineFunction({
      entry: "./on-delete-handler.ts",
    }),
  },
});
