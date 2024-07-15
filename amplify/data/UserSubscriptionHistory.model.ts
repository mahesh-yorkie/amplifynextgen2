import { a } from '@aws-amplify/backend';

export const UserSubscriptionHistoryModel = a.model({
    id:a.id(),
    userId:a.id().required(),
    user:a.belongsTo('User', 'userId'),
    subscriptionPlanId:a.id().required(),
    subscriptionPlan:a.belongsTo('SubscriptionPlan', 'subscriptionPlanId'),
    amount:a.float().required(),
    startDate:a.time()
}).authorization((allow) => [
  allow.authenticated(),
])