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

const sendEmailFunc = async () => {
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
    subject: subject,
    html: closedMessage,
  };

  const result = await transport.sendMail(mailOptions);
  return result;
};

exports.handler = async (event, context) => {
  await sendEmailFunc();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Let's become serverless conductors!!!",
    }),
  };
};
//   request(webUrl, function (error, response, html) {
//     let status = 'value';
//     let body = '';
//     let uSubject = '';
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       const CLOSED = 'Not Currently Accepting';

//       $('.row.dcs-dateflow.margin-bottom-20').each(function (index, element) {
//         const item = $(element).text().replace(/\s\s+/g, ',').trim();
//         let arr = item.split(',');

//         let availIndex = arr.indexOf('Availability');
//         if (arr[availIndex + 1] == CLOSED) {
//           status = 'CLOSED';
//         } else {
//           status = 'OPEN';
//         }
//       });

//       if (status == 'OPEN') {
//         body = openMessage;
//         uSubject = `${subject}OPEN`;
//       }

//       if (status == 'CLOSED') {
//         body = closedMessage;
//         uSubject = `${subject}CLOSED`;
//       }

//       const oauth2Client = new google.auth.OAuth2(
//         clientId,
//         clientSecret,
//         redirectUrl
//       );

//       oauth2Client.setCredentials({ refresh_token: refreshToken });

//       oauth2Client.getAccessToken(function (err, token) {
//         const transport = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             type: 'OAUTH2',
//             user: authorizedUser,
//             clientId: clientId,
//             clientSecret: clientSecret,
//             refreshToken: refreshToken,
//             accessToken: token,
//           },
//         });

//         const mailOptions = {
//           from: from,
//           to: to,
//           subject: uSubject,
//           html: body,
//         };

//         const result = transport.sendMail(mailOptions, function () {});
//       });
//     }
//   });

//   return {
//     statusCode: 200,
//     body: 'Successfully processed request',
//   };
// };
