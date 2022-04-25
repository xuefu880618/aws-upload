var AWS = require('aws-sdk');
const fs = require("fs");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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"
};
const BUKETNAME ='interview-test1'
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let inputstring = '';
let fetchOneByKey = function () {
    var params = {
        TableName: "Dynamo_api-lambda-db1",
        Key: {
            "ID": "0"
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
            fs.writeFileSync('./output.txt', data1.Body.toString() +":" +inputstring,function(err){
                if (err) 
                    return console.error(err); 
                fs.readFile('./output.txt', 'utf-8', function (err, data) {
                    if (err)
                        return console.error(err);
                    console.log(data);
                });
            });
          }
        }
      );
}
downloadFromS3();


