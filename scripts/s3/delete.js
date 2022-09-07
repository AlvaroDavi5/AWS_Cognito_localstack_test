const dotenv = require('dotenv');
const { deleteFile } = require('../../src/s3/index.js');

const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

deleteFile(
	bucketName,
	'test_file.txt',
);
