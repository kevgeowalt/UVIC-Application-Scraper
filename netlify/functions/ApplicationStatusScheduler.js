import { schedule } from '@netlify/functions';
import {
  openMessage,
  closedMessage,
  subject,
  cronSchedule,
} from '../../config.js';
import { GetApplicationStatus } from '../../src/services/ScraperService.js';
import { SendMail } from '../../src/services/MailService.js';

function testFunc() {
  console.log('Testing testing testing');
}

export const handler = schedule('* * * * *', async (testFunc) => {
  // GetApplicationStatus(function (response) {
  //   let status = response;
  //   let body = '';
  //   let uSubject = '';
  //   if (status == 'OPEN') {
  //     body = openMessage;
  //     uSubject = `${subject}OPEN`;
  //   }

  //   if (status == 'CLOSED') {
  //     body = closedMessage;
  //     uSubject = `${subject}CLOSED`;
  //   }

  //   SendMail(body, uSubject)
  //     .then((mailResult) => console.log('Email sent', mailResult))
  //     .catch((err) => console.error(err.messae));
  // });
  testFunc();
  return {
    statusCode: 200,
    body: 'Successfully processed request',
  };
});
