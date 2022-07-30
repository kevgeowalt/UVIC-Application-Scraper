import {
  authorizedUser,
  from,
  to,
  clientId,
  clientSecret,
  redirectUrl,
  refreshToken,
} from '../../config.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);
oauth2Client.setCredentials({ refresh_token: refreshToken });

export async function SendMail(message, subject) {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: authorizedUser,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: message,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
