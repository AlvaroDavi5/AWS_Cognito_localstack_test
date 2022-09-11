const { signUp } = require('../../src/cognito/index.js');

signUp(
	'test_user',
	'tester@nomail.com',
	'Tester123@',
);
