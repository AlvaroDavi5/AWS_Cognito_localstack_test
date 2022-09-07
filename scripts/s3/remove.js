const dotenv = require('dotenv');
const { deleteBucket } = require('../../src/s3/index.js');

const bucketName = process.env.BUCKET_NAME || 'defaultbucket';

deleteBucket(bucketName);
