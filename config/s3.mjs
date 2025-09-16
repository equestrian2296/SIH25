import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.B2_REGION, // e.g. "eu-central-003"
  endpoint: `https://${process.env.B2_ENDPOINT}`, // s3.eu-central-003.backblazeb2.com
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
  forcePathStyle: true, // Required for Backblaze
});

export default s3;
