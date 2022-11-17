
import time
import json
import boto3


def lambda_handler(event, context):

    # boto3 client
    client = boto3.client("ec2")
    ssm = boto3.client("ssm")

    # getting instance information
    describeInstance = client.describe_instances()

    InstanceId = []
    # fetchin instance id of the running instances
    for i in describeInstance["Reservations"]:
        for instance in i["Instances"]:
            if instance["State"]["Name"] == "running":
                InstanceId.append(instance["InstanceId"])

    # looping through instance ids
    
        # command to be executed on instance
    response = ssm.send_command(
        InstanceIds=['i-07a3dfe3d0cd4a07e'],
        DocumentName="AWS-RunShellScript",
        Parameters={
            #"commands": ["cd req3","sudo yum install -y nodejs"]
            "commands": ["cd req3","cd aws-upload","node download.js","node upload.js","node insert.js"]
        },  # replace command_to_be_executed with command
    )

    # fetching command id for the output
    command_id = response["Command"]["CommandId"]

    time.sleep(3)

    # fetching command output
    output1 = ssm.get_command_invocation(CommandId=command_id, InstanceId='')
    print(output1)
    


    return {"statusCode": 200, "body": json.dumps("good"),"result1":output1}
