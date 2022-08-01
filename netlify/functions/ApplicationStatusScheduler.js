import { schedule } from '@netlify/functions';
import {
  openMessage,
  closedMessage,
  subject,
  cronSchedule,
} from '../../config.js';
import { GetApplicationStatus } from '../../src/services/ScraperService.js';
import { SendMail } from '../../src/services/MailService.js';

let cron = cronSchedule;
export const handler = schedule('* * * * *', async () => {
  let outsideStatus = 'Outside status - ';
  GetApplicationStatus(function (response) {
    let status = response;
    let body = '';
    let uSubject = '';
    console.log(status);
    console.log(outsideStatus, response);
    // if (status == 'OPEN') {
    //   body = openMessage;
    //   uSubject = `${subject}OPEN`;
    // }

    // if (status == 'CLOSED') {
    //   body = closedMessage;
    //   uSubject = `${subject}CLOSED`;
    // }

    // SendMail(body, uSubject)
    //   .then((mailResult) => console.log('Email sent', mailResult))
    //   .catch((err) => console.error(err.messae));
  });

  console.log('OUTSIDE OUTSIDE');
  return {
    statusCode: 200,
    body: 'Successfully processed request',
  };
});
