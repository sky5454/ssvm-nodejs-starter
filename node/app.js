const { say, md5, sha1, sha256, sha512 } = require('../pkg/ssvm_nodejs_starter_lib.js');

const fs = require('fs');
const queryString = require('querystring')
const http = require('http');
const url = require('url');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const queryObject = url.parse(req.url, true).query;   //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
  let body = "";

  console.log(req.url);

  if (method === "POST") {
    req.on('data', chunk => { body += chunk });
    req.on('end', () => {
      body = queryString.parse(body);
      let hashSum = body.hashStr;
      console.log("[body]:  ", body);
      console.log("hashSum: ", hashSum);

      res.writeHead(200, { 'Content-type': 'application/json' });
      res.write(JSON.stringify(
        {
          length: hashSum.length,
          md5: md5(hashSum),
          sha1: sha1(hashSum),
          sha256: sha256(hashSum),
          sha512: sha512(hashSum)
        }
      ));

      res.end();
    });
  } else if (queryObject['name']) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(say(queryObject['name']) + '</p>');
  } else {
    fs.readFile(require('path').join(__dirname, 'index.html'), function (error, data) {  //readFile 是异步的，所以必须把res.end()放在里面 
      if (error) {
        res.writeHead(404);
        res.end('Whoops! File not found!');
        throw error;
      } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data.toString());
      }
    });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`MD5:` + md5(hostname));
});
