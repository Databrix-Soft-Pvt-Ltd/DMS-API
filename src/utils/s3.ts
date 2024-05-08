import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const S3_BUCKET = process.env.S3_BUCKET || '';

const AWSAccessKeyId = process.env.S3_ACCESS_KEY;
const AWSSecretKey = process.env.S3_SECRET_KEY;

const awsConfig = {
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: 'ap-south-1',
};

const s3 = new AWS.S3(awsConfig);

const getTodaysFullDate = () => new Date().toISOString().slice(0, 10).replace(/\//g, '-');

const getFileId = (userId: string | undefined, extension: string) =>
  `${getTodaysFullDate()}/${new Date().getTime()}${
    userId ? `-${userId}` : ''
  }-${uuidv4()}.${extension}`;

export const uploadFileStream = async (
  file: any,
  userId: string | undefined,
  storagePath = 'images',
) => {
  const {
    content,
    meta: { contentType, fileExtension },
  } = await file;
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const fileName = getFileId(userId, fileExtension);
  const uploadParams = {
    // name of your bucket here
    Bucket: S3_BUCKET,
    Key: `${storagePath}/${fileName}`,
    ContentType: contentType,
    Body: content,
  };
  const response = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return response.Key;
};

export const uploadFile = async (file: any, userId: any, storagePath = 'images') => {
  try {
    const { filename, mimetype, createReadStream } = await file;
    const fileStream = createReadStream();
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const fileName = getFileId(filename, userId);
    const uploadParams = {
      // name of your bucket here
      Bucket: S3_BUCKET,
      Key: `${storagePath}/${fileName}`,
      ContentType: mimetype,
      Body: fileStream,
    };
    const response = await s3.upload(uploadParams).promise();

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return response.Key;
  } catch (error: any) {
    if (error.name === 'BadRequestError') {
      const message = 'Upload Aborted Successfully';
      console.log(message);
      return message;
    }
    const message = `Error occured while uploading: ${error}`;
    console.log(message);
    return message;
  }
};
export const getSignedUrl = async (filePath: string[]) => {
  if (filePath.length == 0) {
    return [];
  }

  return filePath.map((item) =>
    s3.getSignedUrl('getObject', {
      Bucket: S3_BUCKET,
      Key: item,
      Expires: 60 * 60,
    }),
  );
};
