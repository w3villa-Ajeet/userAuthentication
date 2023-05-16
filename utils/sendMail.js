import SibApiV3Sdk from "sib-api-v3-sdk";

const sendbluekey = process.env.SENDBLUE_KEY;

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = sendbluekey;
gi
export const sendMail = async (name, email, otp) => {
  try {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      subject: "Team Dev Account Verification Link",
      sender: { email: "ajeetsingh2780@gmail.com", name: "Team Dev" },
      to: [{ name: name, email: email }],
      htmlContent: `<html><body><h1>This is your otp</h1></body></html>${otp}`,
    });
    //   .then(
    //     function (data) {
    //       console.log(data);
    //       return res.status(200).json({
    //         success: true,
    //         message: "Verification link sent to email, please verify!",
    //       });
    //     },
    //     function (error) {
    //       console.log(error);
    //       return res.status(500).json({
    //         success: false,
    //         message: "Something went wrong, please try again!",
    //       });
    //     }
    //   );
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Server Error!");
  }
};
