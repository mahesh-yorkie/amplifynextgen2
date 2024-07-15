import { a } from '@aws-amplify/backend';

export const PoolServiceModel = a.model({
    id:a.id(),
    companyId:a.id().required(),
    company:a.belongsTo('Company', 'companyId'),
    name:a.string(),
    description:a.string(),
    price:a.float(),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])