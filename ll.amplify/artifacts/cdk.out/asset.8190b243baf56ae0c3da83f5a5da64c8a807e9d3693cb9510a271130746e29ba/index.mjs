/** * Reads SSM environment context from a known Amplify environment variable, * fetches values from SSM and places those values in the corresponding environment variables */export const internalAmplifyFunctionResolveSsmParams = async (client) => {    const envPathObject = JSON.parse(process.env.AMPLIFY_SSM_ENV_CONFIG ?? '{}');    const paths = Object.keys(envPathObject);    if (paths.length === 0) {        return;    }    let actualSsmClient;    if (client) {        actualSsmClient = client;    }    else {        const ssmSdk = await import('@aws-sdk/client-ssm');        actualSsmClient = new ssmSdk.SSM();    }    const resolveSecrets = async (paths) => {        const response = await actualSsmClient.getParameters({            Names: paths,            WithDecryption: true,        });        if (response.Parameters && response.Parameters.length > 0) {            for (const parameter of response.Parameters) {                if (parameter.Name) {                    const envKey = Object.keys(envPathObject).find((key) => envPathObject[key].sharedPath === parameter.Name);                    const envName = envKey                        ? envPathObject[envKey].name                        : envPathObject[parameter.Name]?.name;                    process.env[envName] = parameter.Value;                }            }        }        return response;    };    const response = await resolveSecrets(paths);    const sharedPaths = (response?.InvalidParameters || [])        .map((invalidParam) => envPathObject[invalidParam].sharedPath)        .filter((sharedParam) => !!sharedParam);     if (sharedPaths.length > 0) {        await resolveSecrets(sharedPaths);    }};await internalAmplifyFunctionResolveSsmParams();const SSM_PARAMETER_REFRESH_MS = 1000 * 60;setInterval(() => {    void internalAmplifyFunctionResolveSsmParams();}, SSM_PARAMETER_REFRESH_MS);export {};

// node_modules/@aws-amplify/backend-function/lib/lambda-shims/cjs_shim.js
import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";
global.require = createRequire(import.meta.url);
global.__filename = url.fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

// amplify/auth/custom-message/handler.ts
var handler = async (event) => {
  console.log(event);
  const ENVIRONMENT = process.env.ENV;
  let REDIRECTURL = "http://localhost:3007/";
  if (ENVIRONMENT == "dev") {
  } else if (ENVIRONMENT == "stage") {
  } else if (ENVIRONMENT == "prod") {
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
        clientId
      })
    ).toString("base64");
    const url2 = `${redirectUrl}&data=${payload}&code=${codeParameter}`;
    const message = `We received a request to reset your password for your CurrentPools account. If you didn't make this request, please ignore this email.To reset your password, click the link below. 
 ${url2}`;
    event.response.smsMessage = message;
    event.response.emailSubject = "Reset Your Password for CurrentPools";
    event.response.emailMessage = message;
    console.log("event.response", event.response);
  }
  if (event.triggerSource === "CustomMessage_AdminCreateUser") {
    REDIRECTURL = REDIRECTURL + "auth/login";
    const url2 = `${REDIRECTURL}/?email=${event.request.userAttributes.email}&password=${event.request.codeParameter}`;
    const message = `<h5>Welcome to CurrentPools.</h5> Your email is ${event.request.usernameParameter}. Your temporary password is ${event.request.codeParameter} 
  <a href='${url2}'>click to login</a>`;
    event.response.smsMessage = message;
    event.response.emailMessage = message;
    event.response.emailSubject = "Welcome to CurrentPools gen2";
  }
  return event;
};
export {
  handler
};
