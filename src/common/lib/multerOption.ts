import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ENDPOINT } from 'src/config/config';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new BadRequestException('지원하지 않는 이미지 형식입니다.'),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export const createImageURL = (file): string => {
  const serverAddress: string = ENDPOINT;

  return `${serverAddress}public/${file.filename}`;
};
