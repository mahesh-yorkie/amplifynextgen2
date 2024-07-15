import { a } from '@aws-amplify/backend';

export const PlanFeatureModel = a.model({
    id:a.id(),
    name:a.string().required(),
    description:a.string(),
    slug:a.string().required(),
    subscription :a.hasMany('PlanFeatureSubscriptionPlan','PlanFeatureId')
}).authorization((allow) => [
  allow.authenticated(),
])