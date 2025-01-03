import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { extname } from 'path';
const toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  uploadFile(directory: string, file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: directory,
          resource_type: 'auto',
          format: extname(file.originalname).replace('.', ''),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );

      toStream(file.buffer).pipe(uploadStream);
    });
  }
}
