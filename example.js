const Send2Ebook = require("./src/send2ebook");

const connectionSettings = {
    host: "test.ftp.com",
    port: 21, // defaults to 21
    user: "test",
    password: "abcd",
    folder: "/"
}

const options = { connectionSettings }


 //const urls = ["https://www.learnrxjs.io" ,"https://www.codementor.io/edaxfilanderucleshernandez/building-a-utility-class-as-a-module-npm-cnsge9a5g",
 //];

const urls = ["https://medium.com/@blittler/creating-ebook-epub-and-mobi-files-from-markdown-fe1f2d6379a3" ];

 
const s2e = new Send2Ebook(options);
runApp(urls);

async function runApp(urls){
    let a = await s2e.process(urls).then(console.log("teste "));
}

