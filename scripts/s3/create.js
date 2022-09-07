const dotenv = require('dotenv');
const { createBucket } = require('../../src/s3/index.js');

const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

createBucket(bucketName);
