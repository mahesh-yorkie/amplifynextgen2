import { a } from '@aws-amplify/backend';

export const CountryModel = a.model({
    id:a.id(),
    name:a.string().required(),
    state:a.hasMany('State','countryId'),
    PoolServiceLocation:a.hasMany('PoolServiceLocation', 'countryId'),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])