const { createUser } = require('../../src/cognito/index.js');

const userName = 'test_user';

createUser(userName);
