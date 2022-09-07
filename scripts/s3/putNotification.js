const dotenv = require('dotenv');
const { putBucketNotification } = require('../../src/s3/index.js');

const queueArn = process.env.QUEUE_ARN || 'arn:aws:sqs:us-east-1:000000000000:DEFAULT_QUEUE';
const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

const config = {
	QueueConfigurations: [
		{
			QueueArn: queueArn,
			Events: [
				"s3:ObjectCreated:*",
			],
		},
	]
};

putBucketNotification(
	bucketName,
	config,
);
