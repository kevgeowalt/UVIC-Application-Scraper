import schedule from 'node-schedule';
import {
  openMessage,
  closedMessage,
  subject,
  cronSchedule,
} from '../../config.js';
import { GetApplicationStatus } from './ScraperService.js';
import { SendMail } from './MailService.js';

export function InitScheduler() {
  var job = schedule.scheduleJob(cronSchedule, function () {
    console.log('Printing every minute');
  });
}

// var j = schedule.scheduleJob('0 7 * * *', function () {
//   GetApplicationStatus(function (response) {
//     let status = response;
//     let body = '';
//     let uSubject = '';

//     if (status == 'OPEN') {
//       body = openMessage;
//       uSubject = `${subject}OPEN`;
//     }

//     if (status == 'CLOSED') {
//       body = closedMessage;
//       uSubject = `${subject}CLOSED`;
//     }

//     SendMail(body, uSubject)
//       .then((mailResult) => console.log('Email sent', mailResult))
//       .catch((err) => console.error(err.messae));
//   });
// });
