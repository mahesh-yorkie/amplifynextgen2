import { a } from '@aws-amplify/backend';

export const HelpSupportModel = a.model({
    id:a.id(),
    title:a.string().required(),
    description:a.string().required(),
    isActive:a.boolean().default(true)
}).authorization((allow) => [
  allow.authenticated(),
])