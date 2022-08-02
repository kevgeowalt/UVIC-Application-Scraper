import {
  openMessage,
  closedMessage,
  subject,
  cronSchedule,
  authorizedUser,
  from,
  to,
  clientId,
  clientSecret,
  redirectUrl,
  refreshToken,
  webUrl,
} from '../../config.js';
import { GetApplicationStatus } from '../../src/services/ScraperService.js';
import { SendMail } from '../../src/services/MailService.js';
import request from 'request';
import cheerio from 'cheerio';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import axios from 'axios';

const scrapeWebPageFunc = async () => {
  let status = '';
  const { data } = await axios.get(webUrl);
  const $ = cheerio.load(data);
  const CLOSED = 'Not Currently Accepting';

  $('.row.dcs-dateflow.margin-bottom-20').each(function (index, element) {
    const item = $(element).text().replace(/\s\s+/g, ',').trim();
    let arr = item.split(',');

    let availIndex = arr.indexOf('Availability');
    if (arr[availIndex + 1] == CLOSED) {
      status = 'CLOSED';
    } else {
      status = 'OPEN';
    }
  });

  return status;
};

const sendEmailFunc = async (message, emailSubject) => {
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  let accessToken = await oauth2Client.getAccessToken();

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
    subject: emailSubject ?? subject,
    html: message,
  };

  const result = await transport.sendMail(mailOptions);
  return result;
};

exports.handler = async (event, context) => {
  let applicationStatus = await scrapeWebPageFunc();
  let bodyText = '';
  let parsedSubject = '';

  if (applicationStatus == 'OPEN') {
    bodyText = openMessage;
    parsedSubject = `${subject}OPEN`;
  }

  if (applicationStatus == 'CLOSED') {
    bodyText = closedMessage;
    parsedSubject = `${subject}CLOSED`;
  }

  await sendEmailFunc(bodyText, parsedSubject);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Email alert sent',
    }),
  };
};
