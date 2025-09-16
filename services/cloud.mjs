// services/b2.js
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");

const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,   // e.g. https://s3.eu-central-003.backblazeb2.com
  region: process.env.B2_REGION,                 // required by SDK, ignored by Backblaze
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});

// Upload video file
async function uploadToB2(file) {
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.B2_BUCKET,
    Key: file.originalname,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Generate a signed URL valid for 1 hour
  const signedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: file.originalname,
    }),
    { expiresIn: 3600 } // 1 hour in seconds
  );

  return signedUrl;
}

module.exports = { uploadToB2 };
