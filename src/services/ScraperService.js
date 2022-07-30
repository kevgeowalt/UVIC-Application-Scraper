import { webUrl } from '../../config.js';
import request from 'request';
import cheerio from 'cheerio';

const diplomaUrl = webUrl;

export async function GetApplicationStatus(callback) {
  let status = 'value';
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
      return callback(status);
    } else {
      throw 'Failed to get application status';
    }
  });
}
