import { a } from '@aws-amplify/backend';

export const PoolServiceLocationModel = a.model({
    id:a.id(),
    companyId:a.id().required(),
    company:a.belongsTo('Company', 'companyId'),
    countryId:a.id().required(),
    country:a.belongsTo('Country', 'countryId'),
    stateId:a.id().required(),
    state:a.belongsTo('State', 'stateId'),
    cityId:a.id().required(),
    city:a.belongsTo('City', 'cityId'),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])