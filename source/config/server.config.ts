/* eslint-disable @typescript-eslint/no-magic-numbers */
import { join } from 'path';
import { default as appRootPath } from 'app-root-path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class ServerConfig {

    private readonly _base: string;
    private readonly _port: number;
    private readonly _images: string;

    constructor(configService: ConfigService) {
        this._base = configService.getString('SERVER_BASE');
        this._port = configService.getNumber('SERVER_PORT');
        this._images = configService.getString('SERVER_IMAGES_FOLDER');
    }

    public resolveTemplates(folder: string): string {
        return appRootPath.resolve(join('resources/templates/', folder));
    }

    public get public(): string {
        return appRootPath.resolve('public');
    }

    public get assets(): string {
        return join(this.public, 'assets');
    }

    public get imageFolder(): string {
        return join(this.public, this._images);
    }

    public imagePath(uuid: string): string {
        return join(this.imageFolder, uuid + '.webp');
    }

    public imageURL(uuid: string): string {
        return join(this._images, uuid + '.webp');
    }

    public get base(): string {
        return this._base;
    }

    public get port(): number {
        return this._port;
    }

    public get manifest(): string {
        return join(this.assets, 'manifest.json');
    }
}
