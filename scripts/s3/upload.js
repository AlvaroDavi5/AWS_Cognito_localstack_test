const dotenv = require('dotenv');
const { uploadFile } = require('../../src/s3/index.js');

const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

uploadFile(
	bucketName,
	'./assets/test_file.txt',
);
