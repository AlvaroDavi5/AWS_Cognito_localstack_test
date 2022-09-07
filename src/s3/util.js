const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');


const bucketName = process.env.BUCKET_NAME || 'defaultbucket';
const bucketUrl = process.env.BUCKET_URL || 'http://localhost:4566/';
const awsRegion = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'mock';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || 'mock';

// Set the region
AWS.config.update({ region: awsRegion });

const config = {
	endpoint: new AWS.Endpoint(bucketUrl), // https://s3.us-east-1.amazonaws.com
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: awsRegion,
	apiVersion: 'latest',
};

// Create an S3 service object
const S3 = new AWS.S3(config);

const createParams = (bucketName) => {
	return {
		Bucket: bucketName,
		CreateBucketConfiguration: {
			LocationConstraint: awsRegion
		},
	};
};

const notificationConfigureParams = (bucketName, configuration) => {
	return {
		Bucket: bucketName,
		NotificationConfiguration: configuration,
	};
};

const uploadParams = (bucketName, filePath) => {

	const params = {
		Bucket: `${bucketName}`,
		Key: '',
		Body: '',
	};

	try {
		const fileBaseName = path.basename(filePath);
		const fileStream = fs.createReadStream(filePath);

		params.Key = fileBaseName;
		params.Body = fileStream;
	}
	catch (error) {
		console.log('Error:', error);
	}

	return params;
};

const getObjectParams = (bucketName, objectKey) => {
	return {
		Bucket: bucketName,
		Key: objectKey,
	};
};


module.exports = {
	S3,
	createParams,
	notificationConfigureParams,
	uploadParams,
	getObjectParams,
};
