import { a } from '@aws-amplify/backend';

export const PlanFeatureSubscriptionPlanModel = a.model({
    id:a.id(),
    SubscriptionPlanId:a.id().required(),
    PlanFeatureId:a.id().required(),
    subscriptionplan:a.belongsTo('SubscriptionPlan','SubscriptionPlanId'),
    planfeature:a.belongsTo('PlanFeature','PlanFeatureId')
}).authorization((allow) => [
  allow.authenticated(),
])