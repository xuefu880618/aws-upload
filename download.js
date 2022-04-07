var AWS = require('aws-sdk');
const fs = require("fs");
const crypto = require("crypto");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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"
};
const BUKETNAME ='upload-api1'

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let inputstring = '';
let fetchOneByKey = function () {
    var params = {
        TableName: "testdata",
        Key: {
            "ID": "960ac12e-16dc-46ac-8fa7-ce37470bf288"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            inputstring = data["Item"]['Input String'];
            console.log(inputstring);
        }
    })
}


fetchOneByKey();
var AWS = require('aws-sdk');
awsConfig = {
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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","endpoint": null,
};
AWS.config.update(awsConfig);
var s3 = new AWS.S3();
let downloadFromS3 = function (){
    s3.getObject(
        { Bucket: "upload-api1", Key: "input.txt" },
        function (error, data1) {
          if (error != null) {
            console.log("Failed to retrieve an object: " + error);
          } else {
            //alert("Loaded " + data.ContentLength + " bytes");
            console.log("Loaded " + data1.ContentLength + " bytes");
            console.log(data1.Body.toString());
            // do something with data.Body
            fs.writeFileSync('C:/Users/user/Desktop/Fovus_intern/output.txt', data1.Body + inputstring);
          }
        }
      );
}
downloadFromS3();
let file = fs.readFileSync('C:/Users/user/Desktop/Fovus_intern/output.txt', (err) => { 
    if (err) { 
      console.log(err); 
    } 
  });
let uploadToS3 = function (){
    
    
    s3.putObject({
        Key:'output.txt',
        Bucket:BUKETNAME,
        ContentType:'text/plain',
        Body:file,
        //ACL:'public-read',
    }).promise();
}
uploadToS3();
//let docClient = new AWS.DynamoDB.DocumentClient();
awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
//console.log(file.toString());

let insert1 = function () {
    var params = {
        TableName: "testdata",
        
            "Item": {
                "ID": crypto.randomUUID().toString(),
                "Filepath":BUKETNAME + "output.txt",
                
              }
            
        
    };
    docClient.put(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            //inputstring = data["Item"]['Input String'];
            console.log(JSON.stringify(data, null, 2));
        }
    })
}
insert1();
