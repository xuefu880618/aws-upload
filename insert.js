var AWS = require('aws-sdk');
const crypto = require("crypto");
const BUKETNAME ='upload-api1/'

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAYN6LER2YXTCGB5PH", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

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