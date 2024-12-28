import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

// @ts-ignore
const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY!;

const sendSmtpEmail = new brevo.SendSmtpEmail();

type SendTransactionalEmailProps = {
  to: string;
  subject: string;
  htmlContent: string;
};

export const sendTransactionalEmail = async ({
  to,
  htmlContent,
  subject,
}: SendTransactionalEmailProps) => {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    email: process.env.BREVO_SENDER_EMAIL,
    name: process.env.BREVO_SENDER_NAME,
  };
  sendSmtpEmail.to = [{ email: to }];

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};
