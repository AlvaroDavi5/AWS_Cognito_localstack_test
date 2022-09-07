const dotenv = require('dotenv');
const { downloadFile } = require('../../src/s3/index.js');

const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

downloadFile(
	bucketName,
	'test_file.txt',
);
