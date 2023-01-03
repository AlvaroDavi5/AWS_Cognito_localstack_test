#!/bin/bash


# Create S3 Bucket
awslocal s3api create-bucket --bucket=testbucket --output=table | cat

# Add Access Control to S3 Bucket
awslocal s3api put-bucket-acl --bucket=testbucket --acl=public-read --endpoint-url=http://127.0.0.1:4566 --output=table | cat # only avaliable port on container

# Create SQS Queue
awslocal sqs create-queue --queue-name=test_queue --endpoint-url=http://127.0.0.1:4566 --output=table | cat

# Configurate SQS Queue to Receive Messages from S3 Bucket
echo '{ "QueueConfigurations": [ { "QueueArn": "arn:aws:sqs:us-east-1:000000000000:test_queue", "Events": [ "s3:ObjectCreated:*" ] } ]}' > notification.json
awslocal s3api put-bucket-notification-configuration --bucket=testbucket --notification-configuration=file://notification.json --endpoint-url=http://127.0.0.1:4566 --output=table | cat

# List SQS Queue Attrbutes
awslocal sqs get-queue-attributes --queue-url=http://localhost:4566/queue/test_queue --attribute-names=All --endpoint-url=http://127.0.0.1:4566 --output=table | cat

# Upload File to S3 Bucket
awslocal s3 cp image.png s3://testbucket/ --endpoint-url=http://127.0.0.1:4566 --output=table | cat

# Generate Link to File
awslocal s3 presign s3://testbucket/image.png --expires-in=300 # in seconds

# Download File by Link
wget "http://localhost:4566/testbucket/image.png?AWSAccessKeyId=mock&Signature=xxx&Expires=1672756866"

# List Received Messages from SQS
awslocal sqs receive-message --queue-url=http://localhost:4566/queue/test_queue --attribute-names=All --message-attribute-names=All --endpoint-url=http://127.0.0.1:4566 --output=json | cat

# Remove File from Bucket
awslocal s3 rm s3://testbucket/image.png

