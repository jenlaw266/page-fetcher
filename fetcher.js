const input = process.argv.slice(2);
const fetchedSite = {};
const fs = require("fs");

const request = require("request");
request(input[0], (error, response, body) => {
  fetchedSite.error = error;
  fetchedSite.statusCode = response && response.statusCode;
  fetchedSite.body = body;

  const content = JSON.stringify(fetchedSite);
  fs.writeFile(input[1], content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const bytesSize = Buffer.byteLength(JSON.stringify(fetchedSite));
  console.log(`Downloaded and saved ${bytesSize} bytes to ${input[1]}`);
});

//> node fetcher.js http://www.example.edu/ ./index.html
//Downloaded and saved 3261 bytes to ./index.htm
