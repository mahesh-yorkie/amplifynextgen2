import { a } from '@aws-amplify/backend';

export const StateModel = a.model({
    id:a.id(),
    name:a.string().required(),
    countryId:a.id().required(),
    country:a.belongsTo('Country', 'countryId'),
    city:a.hasMany('City', 'stateId'),
    PoolServiceLocation:a.hasMany('PoolServiceLocation', 'stateId'),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])