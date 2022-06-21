import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AWSConfig } from 'src/config/config';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: AWSConfig.accessKeyId,
  secretAccessKey: AWSConfig.secretAccessKey,
  region: process.env.AWS_REGION,
});

@Injectable()
export class UploadService {
  async uploadImage(files) {
    const locations = [];
    files.forEach((v) => locations.push(v.location));
    return locations;
  }
}
