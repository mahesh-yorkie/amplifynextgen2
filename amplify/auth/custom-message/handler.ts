import type { CustomMessageTriggerHandler } from "aws-lambda";
import { env } from "$amplify/env/custom-message"; // the import is '$amplify/env/<function name>'

export const handler: CustomMessageTriggerHandler = async (event) => {
  console.log(event);
  const ENVIRONMENT: string | undefined = env.ENVIRONMENT;
  const FRONT_URL: string | undefined = env.FRONT_URL;

  let REDIRECTURL: string | undefined = FRONT_URL;
  if (ENVIRONMENT == "dev") {
    //REDIRECTURL = "http://localhost:3007/auth/reset-password"
  } else if (ENVIRONMENT == "stage") {
    if (FRONT_URL) REDIRECTURL = FRONT_URL;
  } else if (ENVIRONMENT == "prod") {
    if (FRONT_URL) REDIRECTURL = FRONT_URL;
  }

  if (event.triggerSource === "CustomMessage_ForgotPassword") {
    const { codeParameter } = event.request;
    const { region, userName } = event;
    const { clientId } = event.callerContext;

    REDIRECTURL = REDIRECTURL + "auth/reset-password";

    let redirectUrl = `${REDIRECTURL}/?username=${userName}`;
    const payload = Buffer.from(
      JSON.stringify({
        userName,
        redirectUrl,
        region,
        clientId,
      })
    ).toString("base64");

    const url = `${redirectUrl}&data=${payload}&code=${codeParameter}`;
    const message = `We received a request to reset your password for your CurrentPools account. If you didn't make this request, please ignore this email.To reset your password, click the link below. \n ${url}`;
    event.response.smsMessage = message;
    event.response.emailSubject = "Reset Your Password for CurrentPools";
    event.response.emailMessage = message;
    console.log("event.response", event.response);
  }
  if (event.triggerSource === "CustomMessage_AdminCreateUser") {
    REDIRECTURL = REDIRECTURL + "auth/login";
    const url = `${REDIRECTURL}/?email=${event.request.userAttributes.email}&password=${event.request.codeParameter}`;

    const message = `<h5>Welcome to CurrentPools.</h5> Your email is ${event.request.usernameParameter}. Your temporary password is ${event.request.codeParameter} \n  <a href='${url}'>click to login</a>`;
    event.response.smsMessage = message;
    event.response.emailMessage = message;
    event.response.emailSubject = "Welcome to CurrentPools";
  }

  return event;
};
