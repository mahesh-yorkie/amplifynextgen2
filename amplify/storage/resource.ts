import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyGen2practice',
  access: (allow) => ({
    'profile-pictures/{user_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
});