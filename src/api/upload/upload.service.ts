import { Injectable } from '@nestjs/common';
import { createImageURL } from 'src/common/lib/multerOption';

@Injectable()
export class UploadService {
  public uploadFiles(files: File[]): string[] {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
    }

    return generatedFiles;
  }
}
