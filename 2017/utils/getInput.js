
const http = require('http');
const cookie = require('./cookie');

module.exports = (year, day) => new Promise((resolve, reject) => {
  const options = {
    hostname: 'adventofcode.com',
    port: 80,
    path: `/${year}/day/${day}/input`,
    method: 'GET',
    headers: {
      Cookie: cookie()
    }
  };
  let responseBody = '';
  const req = http.request(options, res => {
    res.setEncoding('utf8');
    res.on('data', data => {
      responseBody += data;
    });
    res.on('end', () => {
      resolve(responseBody);
    })
  });
  req.on('error', (err) => {
    console.log('Error in request: ', err);
    reject();
  })

  req.end();
});
