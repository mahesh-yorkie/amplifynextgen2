import { a } from "@aws-amplify/backend";

export const CompanyModel = a
  .model({
    id: a.id(),
    logo: a.string(),
    name: a.string().required(),
    description: a.string(),
    address: a.customType({
      lat: a.float(),
      long: a.float(),
      street_1: a.string(),
      street_2: a.string(),
      zipcode: a.string(),
      city: a.string(),
      state: a.string(),
      country: a.string(),
    }),
    phone: a.string(),
    email: a.string(),
    website: a.string(),
    socialurl: a.customType({
      facebook: a.string(),
      twitter: a.string(),
      instagram: a.string(),
      linkedin: a.string(),
    }),
    businessLicense: a.string(),
    termsAndConditions: a.string(),
    Users: a.hasMany("User", "companyId"),
    PoolService: a.hasMany("PoolService", "companyId"),
    PoolServiceLocation: a.hasMany("PoolServiceLocation", "companyId"),
    isActive: a.boolean().default(true),
    activationDate: a.time(),
  })
  .authorization((allow) => [allow.authenticated()]);
