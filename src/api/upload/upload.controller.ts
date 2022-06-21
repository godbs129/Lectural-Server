import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import * as AWS from 'aws-sdk';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import ResponseData from 'src/common/response/DataResponse';

const s3 = new AWS.S3();

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        cacheControl: 'max-age=31536000, must-revalidate',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (_, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload(@UploadedFiles() files: Express.Multer.File) {
    const res = await this.uploadService.uploadImage(files);
    return ResponseData.dataOk('파일 업로드 성공', res);
  }
}
