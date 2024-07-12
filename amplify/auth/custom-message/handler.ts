import type { CustomMessageTriggerHandler } from "aws-lambda";

export const handler: CustomMessageTriggerHandler = async (event) => {

	const enviroment = process.env.ENV;
	let REDIRECTURL = "http://localhost:3007/";
	if (enviroment == "dev") {
		//REDIRECTURL = "http://localhost:3007/auth/reset-password"
	} else if (enviroment == "stage") {
		///REDIRECTURL = ""
	} else if (enviroment == "prod") {
		//REDIRECTURL = ""
	}

	if (event.triggerSource === "CustomMessage_ForgotPassword") {
        const { codeParameter } = event.request;
        const { region, userName } = event;
        const { clientId } = event.callerContext;

        REDIRECTURL = REDIRECTURL + "auth/reset-password";

        let redirectUrl = `${REDIRECTURL}/?username=${userName}`;
        const resourcePrefix = process.env.RESOURCENAME.split("CustomMessage")[0];
        const payload = Buffer.from(
        JSON.stringify({
            userName,
            redirectUrl,
            region,
            clientId,
        })
        ).toString("base64");

        const url = `${redirectUrl}&data=${payload}&code=${codeParameter}`;
        const message = `${process.env.EMAILMESSAGE}. \n ${url}`;
        event.response.smsMessage = message;
        event.response.emailSubject = process.env.EMAILSUBJECT;
        event.response.emailMessage = message;
        console.log("event.response", event.response);
    }
    if (event.triggerSource === "CustomMessage_AdminCreateUser") {
        REDIRECTURL = REDIRECTURL + "auth/login";
        const url = `${REDIRECTURL}/?email=${event.request.userAttributes.email}&password=${event.request.codeParameter}`;
        // console.log("url", url);
        // const message = `Welcome to CurrentPools!\n Hi ${event.request.userAttributes.email},\n Thank you for signing up. Please click the link below to login:\n
        //     ${url}`;
        // event.response.smsMessage = message;
        // event.response.emailSubject = message //"Welcome to CurrentPools";
        // event.response.emailMessage = message;
        // console.log("event.response", event.response);


        const message = `<h5>Welcome to CurrentPools.</h5> Your email is ${event.request.usernameParameter}. Your temporary password is ${event.request.codeParameter} \n  <a href='${url}'>click to login</a>`;
        event.response.smsMessage = message;
        event.response.emailMessage = message;
        event.response.emailSubject = "Welcome to CurrentPools";
    }

  	return event;
};