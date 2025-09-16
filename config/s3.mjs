import { S3Client } from "@aws-sdk/client-s3";

// Debug logging
console.log('=== S3 Configuration Debug ===');
console.log('B2_REGION:', process.env.B2_REGION);
console.log('B2_ENDPOINT:', process.env.B2_ENDPOINT);
console.log('Final endpoint:', `https://${process.env.B2_ENDPOINT}`);
console.log('B2_KEY_ID:', process.env.B2_KEY_ID);
console.log('B2_APP_KEY length:', process.env.B2_APP_KEY?.length);
console.log('================================');

const s3 = new S3Client({
  region: process.env.B2_REGION,
  endpoint: `${process.env.B2_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
  forcePathStyle: true,
});

export default s3;