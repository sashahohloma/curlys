/* eslint-disable @typescript-eslint/no-magic-numbers */
import { join } from 'path';
import { default as appRootPath } from 'app-root-path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class ServerConfig {

    private readonly _base: string;
    private readonly _port: number;

    private readonly _public = 'public';
    private readonly _manifest = 'manifest.json';

    constructor(configService: ConfigService) {
        this._base = configService.getString('SERVER_BASE');
        this._port = configService.getNumber('SERVER_PORT');
    }

    public resolveTemplates(folder: string): string {
        return appRootPath.resolve(join('resources/templates/', folder));
    }

    public get base(): string {
        return this._base;
    }

    public get port(): number {
        return this._port;
    }

    public get public(): string {
        return appRootPath.resolve(this._public);
    }

    public get manifest(): string {
        return join(this.public, this._manifest);
    }
}
