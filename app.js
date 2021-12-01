
//'use strict';
const ApiBuilder = require('claudia-api-builder');
//var Mercury = require('@postlight/mercury-parser');
const api = new ApiBuilder();
//const getHTML = require('html-get');
const Send2Ebook = require("./src/send2ebook");

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});

const connectionSettings = {
  host: "test.ftp.com",
  port: 21, // defaults to 21
  user: "test",
  password: "abcd",
  folder: "/"
}

const options = { connectionSettings }

const urls = ["https://medium.com/@blittler/creating-ebook-epub-and-mobi-files-from-markdown-fe1f2d6379a3" ];

const s2e = new Send2Ebook(options);

app.get('/', async (req, res) => {
  const user = await teste();
    res.end("bbb " + urls + " " + user);
});

async function teste() {
  return await s2e.process(urls);
  //return aa;
}

api.get('/convert', async (req, res) => {
  //const randomNumber = Math.floor(Math.random() * 10);
  //const message = `Hello ${req.queryString.name}. Your lucky number is ${randomNumber}`;
  //let message = "2";
    const user = await teste();
    return user;
  //s2e.process(urls).then(out => {
   //  return out;
  });
  //return getHTMLFromUrl('https://medium.com/@blittler/creating-ebook-epub-and-mobi-files-from-markdown-fe1f2d6379a3');
    // getHTML('https://medium.com/@blittler/creating-ebook-epub-and-mobi-files-from-markdown-fe1f2d6379a3').then(
    //   ({ url, html, stats, headers, statusCode }) =>
    //     console.log(`
    //       url: ${url}
    //       html: ${Buffer.from(html).byteLength} bytes (HTTP ${statusCode})
    //       time: ${stats.timing} (${stats.mode})
    //   headers: ${Object.keys(headers).reduce(
    //     (acc, key) => `${acc}${key}=${headers[key]} `,
    //     ''
    //   )}
    // `))
   // return message;
    //return 'aaa';
//});

api.get('/hello', req => {
  const randomNumber = Math.floor(Math.random() * 10);
  const message = `Hello ${req.queryString.name}. Your lucky number is ${randomNumber}`;

  return message;
});

api.post('/user', req => {
  // destructure values from the request body
  const { firstName, lastName, title } = req.body;

  // create a new user object
  const newUser = {
    firstName,
    lastName,
    title
  };

  // here is where you would insert data into database, etc
  // db.users.insert(newUser)

  // return response
  return newUser;
});

function getHTMLFromUrl(url) {
  return url;
  //  getHTML(url).then(
  //   ({ url, html, stats, headers, statusCode }) =>
  //     console.log(`
  //       url: ${url}
  //       html: ${Buffer.from(html).byteLength} bytes (HTTP ${statusCode})
  //       time: ${stats.timing} (${stats.mode})
  //   headers: ${Object.keys(headers).reduce(
  //     (acc, key) => `${acc}${key}=${headers[key]} `,
  //     ''
  //   )}
  // `))
}
    

module.exports = api;