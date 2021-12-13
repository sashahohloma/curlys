import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UploadedFiles, UseInterceptors, Version } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ResponseJson } from '@sashahohloma/nestjs/modules/interceptors';
import { filesValidators } from '../../shared/validators/file.validators';
import { Limits } from '../../constants/limits.constants';
import { DessertsService } from './desserts.service';
import { DessertsFieldsDto } from './dto/desserts.fields.dto';
import { DessertsItemDto } from './dto/desserts.item.dto';
import { DessertsEntity } from '../../database/entities/desserts.entity';

@Controller()
@UseInterceptors(ResponseJson)
export class DessertsController {

    private readonly dessertsService: DessertsService;

    constructor(dessertsService: DessertsService) {
        this.dessertsService = dessertsService;
    }

    @Version('1')
    @HttpCode(HttpStatus.OK)
    @Get('desserts')
    public getDessertsList(): Promise<DessertsEntity[]> {
        return this.dessertsService.getList();
    }

    @Version('1')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseInterceptors(FilesInterceptor('images', Limits.four))
    @Post('desserts')
    public async createDessert(
        @Body() body: DessertsFieldsDto,
        @UploadedFiles() files: Express.Multer.File[],
    ): Promise<void> {
        const validFiles = filesValidators(files);
        await this.dessertsService.create(body, validFiles);
    }

    @Version('1')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('dessert')
    public async deleteDessert(@Query() query: DessertsItemDto): Promise<void> {
        await this.dessertsService.delete(query.uuid);
    }

}
