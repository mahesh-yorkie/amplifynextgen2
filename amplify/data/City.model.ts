import { a } from '@aws-amplify/backend';

export const CityModel = a.model({
    id:a.id(),
    name:a.string().required(),
    stateId:a.id().required(),
    state:a.belongsTo('State', 'stateId'),
    PoolServiceLocation:a.hasMany('PoolServiceLocation', 'cityId'),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])