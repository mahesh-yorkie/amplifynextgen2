import { a } from '@aws-amplify/backend';

export const UserModel = a.model({
    id:a.id(),
      companyId:a.id().required(),
      company:a.belongsTo('Company', 'companyId'),
      name:a.string(),
      email:a.string().required(),
      phone:a.string(),
      picture:a.string(),
      address:a.customType({
        lat: a.float(),
        long: a.float(),
      }),
      userGroupList:a.string().array(),
      //subscriptionPlanId:a.id(),
      //subscriptionPlan:a.hasOne('SubscriptionPlan', 'subscriptionPlanId'),
      subscriptionHistories:a.hasMany('UserSubscriptionHistory', 'userId'),
      //requests:a.hasMany('Request', 'userID'),
      //quotes:a.hasMany('Quote', 'userID'),
      notifications:a.hasMany('UserNotification', 'userId'),
      cognitoUsername:a.string(),
      cognitoUserStatus:a.enum(['CONFIRMED', 'RESET_REQUIRED']),
      isActive:a.boolean().default(true),
      activationDate:a.time()
}).authorization((allow) => [
  allow.authenticated(),
])