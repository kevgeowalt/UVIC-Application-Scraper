import { schedule } from '@netlify/functions';
import {
  openMessage,
  closedMessage,
  subject,
  cronSchedule,
} from '../../config.js';
import { GetApplicationStatus } from '../../src/services/ScraperService.js';
import { SendMail } from '../../src/services/MailService.js';

export const handler = schedule('* * * * *', async () => {
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
  let status = 'value';
  let body = '';
  let uSubject = '';

  request(diplomaUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
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

      if (status == 'OPEN') {
        body = openMessage;
        uSubject = `${subject}OPEN`;
      }

      if (status == 'CLOSED') {
        body = closedMessage;
        uSubject = `${subject}CLOSED`;
      }
    }
  });

  console.log(body, uSubject, status);
  return {
    statusCode: 200,
    body: 'Successfully processed request',
  };
});
