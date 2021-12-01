const fs = require("fs")
const archiver = require('archiver');
const Mail = require("nodemailer/lib/mailer");
//import {createZipStream} from 'async-zip-stream';
//const JSZip = require('node-zip');
var MemoryStream = require('memorystream'); 
//var memStream = new MemoryStream(['Hello',' ']);

module.exports = class LocalFileStorage {

    async save(stream, filePath) {
        console.log('Saving file to disk : ' + filePath);

        var result = "???";

        // const writeStream = fs.createWriteStream(filePath);
        //  writeStream.on('open', function() {
        //      stream.pipe(writeStream);
        //  });
        var memStream = new MemoryStream();
        memStream.on('open', function() {
            memStream.pipe(writeStream);
        });

         const nodemailer = require('nodemailer');
         let transporter = nodemailer.createTransport({
                host: 'email-smtp.sa-east-1.amazonaws.com',
               // port: 2525,
                auth: {
                    user: "AKIAUVCC6EDGZVCU2CQ4",
                    pass: "BDEZUNtTbDpYWNFBR4O1Jsuixt51KsP6+c+QlHWQGhkg"
                }
        });
        
        const message
         = {
            from: "read.on.your.kindle@gmail.com",
            to: "guerrarj@gmail.com",
            subject: "Kindle Articles",
            text: "Your Kindle Articles",
            attachments:[
                {   // stream as an attachment
                    filename: filePath,
                    content: memStream._read() //fs.createReadStream(filePath)
                }
            ]
        };

        const info = await transporter.sendMail(message);

        return info.response;

        //var zip = new JSZip(stream)
        //console.log(zip);
        
    }

    async saveMemory(stream, filePath) {
        console.log('Saving file to disk : ' + filePath);
        const zipFile = archiver('zip', { zlib: { level: 0 }});
        const writeStream = fs.createWriteStream(filePath);
        zipFile.pipe(writeStream);
        zipFile.push(stream);
        zipFile.finalize();
        return zipFile;
        //var zip = new JSZip(stream)
        //console.log(zip);
    }
}

