const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

https.createServer({

      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(3000);

app.use(express.static('public'));
