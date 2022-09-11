const { deleteUser } = require('../../src/cognito/index.js');

const userName = 'test_user';

deleteUser(userName);
