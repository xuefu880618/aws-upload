1. Create s3 bucket.
2. Create DynamoDB.
3. Create ec2 instance with vpc and public subnet.
4. Upload lambda-uploadfile, lambda-trigger_run and lambda-DynamoDBfunction code to aws.
5. Create api gateways for lambda function uploadfile and DynamoDBfunction. 
6. Upload index.html to s3 bucket then upload file function will work.
7. Create folder name call req3 and excecute "git clone https://github.com/xuefugod/aws-upload.git" 
8. Excecute lambda-trigger_run code then the final requirement will work.