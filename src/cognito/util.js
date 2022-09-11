const dotenv = require('dotenv');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');


const userPoolId = process.env.USER_POOL_ID || '';
const userPoolClientId = process.env.USER_POOL_CLIENT_ID || '';
const cognitoUrl = process.env.COGNITO_URL || 'http://localhost:4566/';
const awsRegion = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'mock';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || 'mock';

// Set the region
AWS.config.update({ region: awsRegion });

const config = {
	endpoint: new AWS.Endpoint(cognitoUrl), // https://cognito-idp.us-east-1.amazonaws.com/
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: awsRegion,
	apiVersion: 'latest',
};

// Create an Cognito service object
const Cognito = new AWS.CognitoIdentityServiceProvider(config);

const listParams = {
	UserPoolId: userPoolId,
};

const createParams = () => {
	return {
		UserPoolId: userPoolId,
	};
};

const deleteParams = () => {
	return {
		UserPoolId: userPoolId,
		ClientId: userPoolClientId,
	};
};

const signUpParams = (userName, userEmail, password) => {

	return {
		Username: userName,
		Password: password,
		UserAttributes: [
			{
				Name: 'email',
				Value: userEmail
			},
		],
		ClientId: userPoolClientId,
	};
};


module.exports = {
	Cognito,
	listParams,
	createParams,
	deleteParams,
	signUpParams,
};
