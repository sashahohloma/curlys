import { BadRequestException } from '@nestjs/common';
import { arrayOr } from '@sashahohloma/utilities';

export const filesValidators = (fileList: Express.Multer.File[]): Express.Multer.File[] => {
    if (arrayOr(fileList, null) === null) {
        throw new BadRequestException('Files was not attached');
    }
    return fileList;
};
