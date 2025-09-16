const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: process.env.B2_ENDPOINT,
  accessKeyId: process.env.B2_KEY_ID,
  secretAccessKey: process.env.B2_APP_KEY,
  signatureVersion: "v4",
  s3ForcePathStyle: false,
});

module.exports = s3;
