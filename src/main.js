import schedule from 'node-schedule';
import { openMessage, closedMessage, subject } from '../config.js';
import { GetApplicationStatus } from './services/ScraperService.js';
import { SendMail } from './services/MailService.js';

var j = schedule.scheduleJob('0 7 * * *', function () {
  GetApplicationStatus(function (response) {
    let status = response;
    let body = '';
    let uSubject = '';

    if (status == 'OPEN') {
      body = openMessage;
      uSubject = `${subject}OPEN`;
    }

    if (status == 'CLOSED') {
      body = closedMessage;
      uSubject = `${subject}CLOSED`;
    }

    SendMail(body, uSubject)
      .then((mailResult) => console.log('Email sent', mailResult))
      .catch((err) => console.error(err.messae));
  });
});
