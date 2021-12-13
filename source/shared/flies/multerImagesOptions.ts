import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { multerDefaultOptions } from './multerDefaultOptions';

export const multerImagesOptions: MulterOptions = {
    ...multerDefaultOptions,
    fileFilter: (_req: Request, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            const error = new BadRequestException('Only images files are allowed!');
            return cb(error, false);
        }
        return cb(null, true);
    },
};
