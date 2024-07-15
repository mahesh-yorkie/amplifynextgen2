import { a } from '@aws-amplify/backend';

export const SubscriptionPlanModel = a.model({
    id:a.id(),
    title:a.string().required(),
    description:a.string().required(),
    billingCycle:a.enum(['MONTHLY','QUARTERLY','YEARLY']),
    amount:a.float().required(),
    type: a.enum(['BASIC','ESSENTIAL','PREMIUM']),
    isActive:a.boolean().default(true),
    features:a.hasMany('PlanFeatureSubscriptionPlan', 'SubscriptionPlanId'),
    UserSubscriptionHistory:a.hasMany('UserSubscriptionHistory', 'SubscriptionPlanId'),
}).authorization((allow) => [
  allow.authenticated(),
])