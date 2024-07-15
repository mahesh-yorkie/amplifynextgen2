import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
    Company: a.model({
        id: a.id().required(),
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
    }),
   
    PlanFeature:a.model({
      id:a.id().required(),
      name:a.string().required(),
      description:a.string(),
      slug:a.string().required(),
      subscription :a.hasMany('PlanFeatureSubscriptionPlan','PlanFeatureId')
    }),
    SubscriptionPlan:a.model({
      id:a.id().required(),
      title:a.string().required(),
      description:a.string().required(),
      billingCycle:a.enum(['MONTHLY','QUARTERLY','YEARLY']),
      amount:a.float().required(),
      type: a.enum(['BASIC','ESSENTIAL','PREMIUM']),
      isActive:a.boolean().default(true),
      features:a.hasMany('PlanFeatureSubscriptionPlan', 'SubscriptionPlanId') 
    }),
    PlanFeatureSubscriptionPlan:a.model({
      id:a.id().required(),
      SubscriptionPlanId:a.id().required(),
      PlanFeatureId:a.id().required(),
      subscriptionplan:a.belongsTo('SubscriptionPlan','SubscriptionPlanId'),
      planfeature:a.belongsTo('PlanFeature','PlanFeatureId')
    }),
    User:a.model({
      id:a.id().required(),
      companyID:a.id().required(),
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
    }),
    UserSubscriptionHistory:a.model({
      id:a.id().required(),
      userID:a.id().required(),
      user:a.belongsTo('User', 'userID'),
      subscriptionPlanID:a.id().required(),
      subscriptionPlan:a.belongsTo('SubscriptionPlan', 'subscriptionPlanID'),
      amount:a.float().required(),
      startDate:a.time(),
      endDate:a.time()
    }),
    UserNotification:a.model({
      id:a.id().required(),
      title:a.string(),
      description:a.string(),
      type:a.enum(['BROADCAST', 'CONTRACT_SIGNED']),
      userID:a.id().required(),
      user:a.belongsTo('User', 'userID'),
      isRead:a.boolean().default(false),
      readAt:a.time(),
      createdBy:a.id()
    }),
    Country:a.model({
      id:a.id().required(),
      name:a.string().required(),
      state:a.hasMany('State', 'countryID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'countryID'),
      isActive:a.boolean().default(true)
    }),
    State:a.model({
      id:a.id().required(),
      name:a.string().required(),
      countryID:a.id().required(),
      country:a.belongsTo('Country', 'countryID'),
      city:a.hasMany('City', 'stateID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'stateID'),
      isActive:a.boolean().default(true)
    }),
    City:a.model({
      id:a.id().required(),
      name:a.string().required(),
      stateID:a.id().required(),
      state:a.belongsTo('State', 'stateID'),
      PoolServiceLocation:a.hasMany('PoolServiceLocation', 'cityID'),
      isActive:a.boolean().default(true)
    }),
    PoolService:a.model({
      id:a.id().required(),
      companyID:a.id().required(),
      company:a.belongsTo('Company', 'companyID'),
      name:a.string(),
      description:a.string(),
      price:a.float(),
      isActive:a.boolean().default(true)
    }),
    PoolServiceLocation:a.model({
      id:a.id().required(),
      companyID:a.id().required(),
      company:a.belongsTo('Company', 'companyID'),
      countryID:a.id().required(),
      country:a.belongsTo('Country', 'countryID'),
      stateID:a.id().required(),
      state:a.belongsTo('State', 'stateID'),
      cityID:a.id().required(),
      city:a.belongsTo('City', 'cityID'),
      isActive:a.boolean().default(true)
    }),
    HelpSupport:a.model({
      id:a.id().required(),
      title:a.string().required(),
      description:a.string().required(),
      isActive:a.boolean().default(true)
    })
    
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
