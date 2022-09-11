const dotenv = require('dotenv');
const { createUserPool } = require('../../src/cognito/index.js');

const userPoolName = process.env.USER_POOL_NAME || 'default_pool';

createUserPool(userPoolName);
