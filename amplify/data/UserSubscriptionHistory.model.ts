import { a } from '@aws-amplify/backend';

export const UserSubscriptionHistoryModel = a.model({
    id:a.id(),
    userId:a.id().required(),
    user:a.belongsTo('User', 'userId'),
    SubscriptionPlanId:a.id().required(),
    subscriptionPlan:a.belongsTo('SubscriptionPlan', 'SubscriptionPlanId'),
    amount:a.float().required(),
    startDate:a.time()
}).authorization((allow) => [
  allow.authenticated(),
])