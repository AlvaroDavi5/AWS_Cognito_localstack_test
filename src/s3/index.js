const fs = require('fs');
const { S3, createParams, notificationConfigureParams, uploadParams, getObjectParams } = require('./util.js');


module.exports = {
	listBuckets: async () => {
		S3.listBuckets(function (err, data) {
			if (err) {
				console.error("List Error:", err);
			}
			else {
				const buckets = data?.Buckets || [];
				console.log("Buckets:");
				console.table(buckets);
			}
		});
	},

	createBucket: async (bucketName) => {
		S3.createBucket(createParams(bucketName), function (err, data) {
			if (err) {
				console.error("Creation Error:", err);
			}
			else {
				const bucketLocation = data?.Location;
				console.log("Created Successfully:");
				console.table({ bucketLocation });
			}
		});
	},

	deleteBucket: async (bucketName) => {
		S3.deleteBucket({ Bucket: bucketName }, function (err, data) {
			if (err) {
				console.log("Error to Delete:", err);
			}
			else {
				console.log("Deleted Successfully:");
				console.table({ bucketName });
			}
		});
	},

	putBucketNotification: async (bucketName, configuration ) => {
		S3.putBucketNotificationConfiguration(notificationConfigureParams(bucketName, configuration), function (err, data) {
			if (err) {
				console.error("Configure Error:", err);
			}
			else {
				console.log("Configured Successfully:");
				console.table(configuration);
			}
		});
	},

	uploadFile: async (bucketName, filePath) => {
		S3.upload(uploadParams(bucketName, filePath), function (err, data) {
			if (err) {
				console.error("Upload Error:", err);
			}
			else {
				console.log("Upload Successfully:");
				console.table({ bucketName: data?.Bucket, fileKey: data?.Key });
			}
		});
	},

	downloadFile: async (bucketName, objectKey) => {
		S3.getObject(getObjectParams(bucketName, objectKey), function (err, data) {
			if (err) {
				console.error("Download Error:", err);
			}
			else if (data?.Body) {
				fs.writeFile(`./${objectKey}`, `${data?.Body}`, err => {
					if (err) {
						console.error("Save Error:", err);
					}
				});

				console.log("Saved Successfully:");
				console.table({ destiny: `./${objectKey}`, bytes: data?.ContentLength });
			}
		});
	},

	deleteFile: async (bucketName, objectKey) => {
		S3.deleteObject(getObjectParams(bucketName, objectKey), function (err, data) {
			if (err) {
				console.error("Delete Error:", err);
			}
			else {
				console.log("Deleted Successfully:");
				console.table({ deleteMarker: data?.DeleteMarker });
			}
		});
	},
};
