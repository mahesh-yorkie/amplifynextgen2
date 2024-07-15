import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
    Company: a.model({
        id:a.id(),
        logo: a.string(),
        name: a.string().required(),
        description: a.string(),
        address: a.string(),
        phone: a.string(),
        email: a.string(),
        website: a.string(),
        businessLicense: a.string(),
        termsAndConditions: a.string(),
        Users: a.hasMany('User', 'companyId'),//[User] @hasMany
        PoolService :a.hasMany('PoolService', 'companyId'),
        PoolServiceLocation:a.hasMany('PoolServiceLocation', 'companyId'),
        isActive: a.boolean().default(true),
        activationDate: a.time()
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
   
    PlanFeature:a.model({
      id:a.id(),
      name:a.string().required(),
      description:a.string(),
      slug:a.string().required(),
      subscription :a.hasMany('PlanFeatureSubscriptionPlan','PlanFeatureId')
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    SubscriptionPlan:a.model({
      id:a.id(),
      title:a.string().required(),
      description:a.string().required(),
      billingCycle:a.enum(['MONTHLY','QUARTERLY','YEARLY']),
      amount:a.float().required(),
      type: a.enum(['BASIC','ESSENTIAL','PREMIUM']),
      isActive:a.boolean().default(true),
      features:a.hasMany('PlanFeatureSubscriptionPlan', 'SubscriptionPlanId') 
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    PlanFeatureSubscriptionPlan:a.model({
      id:a.id(),
      SubscriptionPlanId:a.id(),
      PlanFeatureId:a.id(),
      subscriptionplan:a.belongsTo('SubscriptionPlan','SubscriptionPlanId'),
      planfeature:a.belongsTo('PlanFeature','PlanFeatureId')
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    User:a.model({
      id:a.id(),
      companyID:a.id(),
      company:a.belongsTo('Company', 'companyID'),
      name:a.string(),
      email:a.required().string(),
      phone:a.string(),
      picture:a.string(),
      address:a.customType({
        lat: a.float(),
        long: a.float(),
      }),
      userGroupList:a.string().array(),
      subscriptionPlanID:a.id(),
      subscriptionPlan:a.hasOne('SubscriptionPlan', 'subscriptionPlanID'),
      subscriptionHistories:a.hasMany('UserSubscriptionHistory', 'userID'),
      //requests:a.hasMany('Request', 'userID'),
      //quotes:a.hasMany('Quote', 'userID'),
      //notifications:a.hasMany('UserNotification', 'userID'),
      cognitoUsername:a.string(),
      cognitoUserStatus:a.enum(['CONFIRMED', 'RESET_REQUIRED']),
      isActive:a.boolean().default(true),
      activationDate:a.time()
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    UserSubscriptionHistory:a.model({
      id:a.id(),
      userID:a.id(),
      user:a.belongsTo('User', 'userID'),
      subscriptionPlanID:a.id(),
      subscriptionPlan:a.belongsTo('SubscriptionPlan', 'subscriptionPlanID'),
      amount:a.float().required(),
      startDate:a.time(),
      endDate:a.time()
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    UserNotification:a.model({
      id:a.id(),
      title:a.string(),
      description:a.string(),
      type:a.enum(['BROADCAST', 'CONTRACT_SIGNED']),
      userID:a.id(),
      user:a.belongsTo('User', 'userID'),
      isRead:a.boolean().default(false),
      readAt:a.time(),
      createdBy:a.id()
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    Country:a.model({
      id:a.id(),
      name:a.string().required(),
      state:a.hasMany('State', 'countryID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'countryID'),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    State:a.model({
      id:a.id(),
      name:a.string().required(),
      countryID:a.id(),
      country:a.belongsTo('Country', 'countryID'),
      city:a.hasMany('City', 'stateID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'stateID'),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    City:a.model({
      id:a.id(),
      name:a.string().required(),
      stateID:a.id(),
      state:a.belongsTo('State', 'stateID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'cityID'),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    PoolService:a.model({
      id:a.id(),
      companyID:a.id(),
      company:a.belongsTo('Company', 'companyID'),
      name:a.string(),
      description:a.string(),
      price:a.float(),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    PoolServiceLocation:a.model({
      id:a.id(),
      companyID:a.id(),
      company:a.belongsTo('Company', 'companyID'),
      countryID:a.id(),
      country:a.belongsTo('Country', 'countryID'),
      stateID:a.id(),
      state:a.belongsTo('State', 'stateID'),
      cityID:a.id(),
      city:a.belongsTo('City', 'cityID'),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    HelpSupport:a.model({
      id:a.id(),
      title:a.string().required(),
      description:a.string().required(),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ]),
    Request:a.model({
      id:a.id(),
      companyID:a.id(),
      company:a.belongsTo('Company', 'companyID'),
      customerID:a.id(),
      customer:a.belongsTo('User', 'customerID'),
      title:a.string(),
      address:a.string(),
      description:a.string(),
      preferredTime:a.enum(['ANYTIME', 'MORNING', 'AFTERNOON', 'EVENING']),
      poolServiceList:a.string().array(),
      stage:a.enum(['REQUEST', 'QUOTE', 'JOB', 'COMPLETED']),
      quote:a.hasOne('Quote', 'requestID'),
      isActive:a.boolean().default(true)
    }).authorization((allow) => [
      allow.authenticated(),
    ])
    
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
