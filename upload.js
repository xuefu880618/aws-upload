var AWS = require('aws-sdk');
const fs = require("fs");

awsConfig = {
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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","endpoint": null,
};
AWS.config.update(awsConfig);
var s3 = new AWS.S3();
const BUKETNAME ='interview-test1'
let uploadToS3 = function (){
    let file = fs.readFileSync('./output.txt', (err) => { 
        if (err) { 
          console.log(err); 
        } 
      });
    
    s3.putObject({
        Key:'output.txt',
        Bucket:BUKETNAME,
        ContentType:'text/plain',
        Body:file,
        //ACL:'public-read',
    }).promise();
}
uploadToS3();

