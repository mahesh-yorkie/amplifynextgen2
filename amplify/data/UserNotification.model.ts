import { a } from '@aws-amplify/backend';

export const UserNotificationModel = a.model({
    id:a.id(),
    title:a.string(),
    description:a.string(),
    type:a.enum(['BROADCAST', 'CONTRACT_SIGNED']),
    userId:a.id().required(),
    user:a.belongsTo('User', 'userId'),
    isRead:a.boolean().default(false),
    readAt:a.time(),
    createdBy:a.id()
}).authorization((allow) => [
  allow.authenticated(),
])