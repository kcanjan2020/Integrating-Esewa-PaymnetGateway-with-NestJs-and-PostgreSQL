// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { v2 as cloudinary } from 'cloudinary';
// import e from 'express';
// import { extname } from 'path';
// const toStream = require('buffer-to-stream');
// @Injectable()
// export class StorageService {
//   constructor(private readonly configService: ConfigService) {
//     cloudinary.config({
//       cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
//       api_key: this.configService.get('CLOUDINARY_API_KEY'),
//       api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
//     });
//   }

//   uploadFile(directory: string, file: Express.Multer.File): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: directory,
//           resource_type: 'auto',
//           format: extname(file.originalname).replace('.', ''),
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result.secure_url);
//         },
//       );

//       toStream(file.buffer).pipe(uploadStream);
//     });
//   }
// }
