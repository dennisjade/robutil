import nodemailer from 'nodemailer';
import { log } from './logger'

const defaultTo = 'dennis.toribio@viseo.com'
const defaultFrom = 'mailer <robutils@mailer.com>'

const getTransporter = (mailCreds) => new Promise((resolve) => {
  try {
    const transporter = nodemailer.createTransport(mailCreds);
    resolve(transporter);
  } catch (e) {
    log.error('getTransporter', e)
  }
});

const sendEmail = (mailOptions, smtpTransport) =>
  new Promise((resolve, reject) => smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      log.error(`Could not send email err: ${error}`);
      return reject(error);
    }
    log.info(`Message sent: ${JSON.stringify(response.accepted)}`);
    return resolve(response);
  }));

const sendEmailNotification = async (requestBody, from = defaultFrom, to = defaultTo, mailCreds, store) => {
  try {
    const transporter = await getTransporter(mailCreds);
    const mailOptions = {
      from,
      to,
      subject: `${requestBody.subject} (store name: ${store})`,
      html: requestBody.body,
    };
    if (requestBody.filePath) {
      mailOptions.attachments = [
        {
          path: requestBody.filePath,
        },
      ];
    }
    await sendEmail(mailOptions, transporter);
    return true;
  } catch (e) {
    log.error('sendEmailNotification', e)
    return e;
  }
};

export default sendEmailNotification;
