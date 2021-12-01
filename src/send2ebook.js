const FtpStorage = require("./flow/output/ftp/ftpStorage")
const LocalFileStorage = require("./flow/output/file/fileStorage")
const ToEpubConverter = require('./flow/converter/toEpubConverter');
const UrlInputProcessor = require('./flow/input/urlInputProcessor');
const { toArray } = require("rxjs/operators");
const NameSanitarizer = require("./util/nameSanitarizer");
const { Observable } = require("rxjs");


module.exports = class Send2Ebook {

  constructor(options) {
    this.options = options;
  }


  async process([...urls], outputname) {

    const urlInputProcessor = new UrlInputProcessor(this.options);
    const chapterDataSubject$ = await urlInputProcessor.gatherEbookData(urls);
    let teste = "?";
    let epubData;
    epubData = chapterDataSubject$.pipe(toArray()).toPromise();

    // var end =  new Promise(function(resolve, reject) {
    //   epubData.on('end', () => resolve(a.read()));
    //   epubData.on('error', reject); // or something like that. might need to close `hash`
    // });

    //(async function() {
      let aa = await epubData;
      //console.log("aaaa " + epubData);
      if (aa.length > 0) {
        teste = "???";
        teste = await this.convertToEpubAndSaveToFtp(aa);
        console.log(teste);
        //return(teste);
        //.then(
        //   result => {
        //     console.log('dsaklçdkas ' + result);
        //     teste = result;
        //     return("???111: " + result);
        //   }
        // );
        //console.log(epubData);
        
        //return(epubData);
      } else {
        console.error("Can't create Epub without context.");
        teste = "Can't create Epub without context.";
       // return("ddddddddddddddddddd");
      }
      
      return teste;
      //console.log(teste);

    //}());
    
      //toArray(), ).toPromise( async(epubData) => {

      // if (epubData.length > 0) {
      //   teste = "???";
      //   teste = await this.convertToEpubAndSaveToFtp(epubData);
        
      //   //.then(
      //   //   result => {
      //   //     console.log('dsaklçdkas ' + result);
      //   //     teste = result;
      //   //     return("???111: " + result);
      //   //   }
      //   // );
      //   //console.log(epubData);
        
      //   //return(epubData);
      // } else {
      //   console.error("Can't create Epub without context.");
      //   teste = "Can't create Epub without context.";
      //   return("ddddddddddddddddddd");
      // }
   // });
    
    // subscribe(epubData => {
     
    //   epubData.title = outputname;

    //   if (epubData.length > 0) {
    //     teste = "???";
    //     teste = await this.convertToEpubAndSaveToFtp(epubData);
        
    //     //.then(
    //     //   result => {
    //     //     console.log('dsaklçdkas ' + result);
    //     //     teste = result;
    //     //     return("???111: " + result);
    //     //   }
    //     // );
    //     //console.log(epubData);
        
    //     //return(epubData);
    //   } else {
    //     console.error("Can't create Epub without context.");
    //     teste = "Can't create Epub without context.";
    //     return("ddddddddddddddddddd");
    //   }
      
      //teste = "fim: " + chapterDataSubject$ + ' ' + epubData.length;
      //return(epubData);
   // });

    //return(teste);

  }


  async convertToEpubAndSaveToFtp(epubData) {

    const converter = new ToEpubConverter(this.options);
    const duplexStream = await converter.convert(epubData);
    
    const fileName = new NameSanitarizer().sanitarizeName(epubData.title) + epubData.fileExt;

    var test = await new LocalFileStorage().save(duplexStream, "/tmp/" + fileName);//.then(result=>{
      //console.log("uuuuu " + test);
      return test;
    //});


    //await this.saveOutput(duplexStream, fileName);
  }



  async saveOutput(stream, fileName) {

    const ftpStorage = new FtpStorage(this.options);
    try {
      await ftpStorage.connect();
      await ftpStorage.save(stream, fileName);
    }
    catch (err) {
      console.error("FTP error: " + err);
    }
    ftpStorage.disconnect();
  }
}

