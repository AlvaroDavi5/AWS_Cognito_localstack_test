const { Cognito, listParams, createParams, deleteParams, signUpParams } = require('./util.js');

module.exports = {
	list: async () => {
		Cognito.listUserPools({ MaxResults: 10 }, function (err, data) {
			if (err) {
				console.log("List User Pools Error:", err);
			}
			else {
				const userPools = data?.UserPools;
				console.log("User Pools:");
				for (const userPool of userPools) {

					Cognito.listUserPoolClients({ UserPoolId: userPool.Id }, function (err, data) {
						if (err) {
							console.log("List Clients Error:", err);
						}
						else {
							const clients = data?.UserPoolClients || [];
							console.log({ userPoolClients: clients, ...userPool });
						}
					});
				}
			}
		});
	},

	createUserPool: async (poolName) => {
		Cognito.createUserPool({ PoolName: poolName }, function (err, data) {
			if (err) {
				console.log("Create User Pool Error:", err);
			}
			else {
				const userPool = data?.UserPool;
				console.log("User Pool Created Successfully:");
				console.table({ userPool });
			}
		});
	},

	createClient: async (clientName) => {
		Cognito.createUserPoolClient({ ClientName: clientName, ...createParams() }, function (err, data) {
			if (err) {
				console.log("Create User Pool Client Error:", err);
			}
			else {
				const userPoolClient = data?.UserPoolClient;
				console.log("User Pool Client Created Successfully:");
				console.table({ userPoolClient });
			}
		});
	},

	createUser: async (userName) => {
		Cognito.adminCreateUser({ Username: userName, ...createParams() }, function (err, data) {
			if (err) {
				console.log("Create User Error:", err);
			}
			else {
				const user = data?.User;
				console.log("User Created Successfully:");
				console.table({ user });
			}
		});
	},

	deleteUser: async (userName) => {
		Cognito.adminDeleteUser({ Username: userName, UserPoolId: deleteParams().UserPoolId }, function (err, data) {
			if (err) {
				console.log("Delete User Error:", err);
			}
			else {
				console.log("User Deleted Successfully:");
				console.table({ ...deleteParams() });
			}
		});
	},

	deleteClient: async () => {
		Cognito.deleteUserPoolClient(deleteParams(), function (err, data) {
			if (err) {
				console.log("Delete User Pool Client Error:", err);
			}
			else {
				console.log("User Pool Client Deleted Successfully:");
				console.table({ ...deleteParams() });
			}
		});
	},

	deleteUserPool: async () => {
		Cognito.deleteUserPool({ UserPoolId: deleteParams().UserPoolId }, function (err, data) {
			if (err) {
				console.log("Delete User Pool Error:", err);
			}
			else {
				console.log("User Pool Deleted Successfully:");
				console.table({ UserPoolId: deleteParams().UserPoolId });
			}
		});
	},

	signUp: async (userName, userEmail, password) => {
		Cognito.signUp(signUpParams(userName, userEmail, password), function (err, data) {
			if (err) {
				console.log("SignUp Error:", err);
			}
			else {
				console.log("SignedUp Successfully:");
				console.table({
					userConfirmed: data?.UserConfirmed,
					userSub: data?.UserSub,
					codeDeliveryDetails: data?.CodeDeliveryDetails,
				});
			}
		});
	},

	confirmSignUp: async (userName) => {
		Cognito.adminConfirmSignUp({ Username: userName, ...createParams() }, function (err, data) {
			if (err) {
				console.log("SignUp Confirm Error:", err);
			}
			else {
				console.log("SignUp Confirmed Successfully");
			}
		});
	},

	getUser: async (userName) => {
		Cognito.adminGetUser({ Username: userName, ...createParams() }, function (err, data) {
			if (err) {
				console.log("Get User Error:", err);
			}
			else {
				console.log("User Getted Successfully");
				console.table({ ...data });
			}
		});
	},
};
