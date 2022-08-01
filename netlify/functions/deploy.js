// import { schedule } from '@netlify/functions';

// export const handler = schedule('* * * * *', async () => {
//   console.log('Scheduled function executed');
//   return {
//     statusCode: 200,
//     body: 'Hello from scheduled function',
//   };
// });

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'Regualr function',
  };
};
