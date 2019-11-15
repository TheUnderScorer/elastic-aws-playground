import { config as awsConfig } from 'aws-sdk';

/**
 * AWS SDK setup
 */
export const updateAwsCredentials = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

  awsConfig.update({
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
};
