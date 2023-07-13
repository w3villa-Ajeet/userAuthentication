// //phone otp send
// import sgMail from "@sendgrid/mail";
// import twilio from "twilio";
// const twillio_email_key = process.env.TWILIO_EMAIL_KEY;
// const twillio_account_sid = process.env.TWILIO_ACCOUNT_SID;
// const twillio_auth_token = process.env.TWILIO_AUTH_TOKEN;
// sgMail.setApiKey(twillio_email_key);

// const client = new twilio(twillio_account_sid, twillio_auth_token);
// export const testing = async (req, res) => {
//   try {
//     console.log("hit or not");
//     let data = await client.messages.create({
//       body: "This is the ship that made the Kessel Run in fourteen parsecs?",
//       from: "+16293488023",
//       to: "+919793292780",
//     });
//     console.log({ data });
//   } catch (error) {
//     console.log(error);
//   }
// };

import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDBLUE_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

sendTransacSms = {
  sender: "+919793292780",
  recipient: "+918318746213",
  content: "string",
};

const smss = async () => {
  apiInstance.sendTransacSms(sendTransacSms).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

smss();
