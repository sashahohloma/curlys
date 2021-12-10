import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import multer from 'multer';
import { BYTE_MULTIPLIER } from '../../constants/bytes.constants';
import { Limits } from '../../constants/limits.constants';

export const multerDefaultOptions: MulterOptions = {
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: BYTE_MULTIPLIER * BYTE_MULTIPLIER * Limits.four,
    },
    fileFilter: (_req: Request, file, cb) => {
        if (!file.originalname.match(/\.(webp)$/)) {
            const error = new BadRequestException('Only webp image files are allowed!');
            return cb(error, false);
        }
        return cb(null, true);
    },
};
