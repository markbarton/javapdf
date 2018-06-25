
const logger = require("../../logger");
var request=require('request');

module.exports = function (req, res, next) {
    logger.debug("Starting PDF Output");
    
    //Build GET URL
    var url = 'http://localhost:8111/html/invoice/111';
    var exec = require('child_process').exec, child;

    //var pdffilename = generateUUID() + ".pdf"
    var pdffilename = "test.pdf"

    child = exec('java -Xmx512m -cp C:\\egg\\java\\pd4ml_demo.jar Pd4Cmd "'+url+'" 850 -out public\\invoices\\'+pdffilename+' -insets 5,5,5,5,pt -bgimage "http://localhost:8111/watermark.png"',
    //child = exec('java -Xmx512m -cp c:\\pd4ml_demo.jar Pd4Cmd "' + url + '" 850 -out public\\atol\\pdf\\' + pdffilename + ' -insets 5,5,5,5,pt',
        function (error, stdout, stderr) {
            logger.info(stdout)
            logger.info(stderr)
            if (error !== null) {
                logger.error('exec error: ' + error);
                return
            }
            logger.debug('PDF Finished')
           // req._filename = pdffilename;

         return  request.get({url:'http://localhost:8111/invoices/test.pdf'}).pipe( res );

        });


}