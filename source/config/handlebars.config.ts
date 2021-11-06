import { default as fs } from 'fs';
import { HelperDelegate } from 'handlebars';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ServerConfig } from './server.config';
import { jsonParse, stringOr } from '@sashahohloma/utilities';

@Injectable()
export class HandlebarsConfig {

    private readonly _layouts: string;
    private readonly _partials: string;
    private readonly _pages: string;

    private readonly _serverURL: string;
    private readonly _manifest: string;

    private readonly _title: string;
    private readonly _description: string;

    constructor(serverConfig: ServerConfig) {
        this._layouts = serverConfig.resolveTemplates('layouts');
        this._partials = serverConfig.resolveTemplates('partials');
        this._pages = serverConfig.resolveTemplates('pages');

        this._serverURL = serverConfig.base;
        this._manifest = serverConfig.manifest;

        this._title = 'Кудряшкин - Закажи трайфл десерт онлайн!';
        this._description = 'Купить свежие трайлф-десерты в Пятигорске с доставкой';
    }

    private getManifestFile(filepath: string): string {
        const file = fs.readFileSync(this._manifest).toString();
        const manifest = jsonParse<Record<string, string>>(file);

        const value = stringOr(manifest[filepath], null);
        if (value === null) {
            throw new InternalServerErrorException(`Ошибка чтения настроек файла ${this._manifest}`);
        }

        return value;
    }

    public get helpers(): Record<string, HelperDelegate> {
        return {
            manifest: (filePath: string): string => this.getManifestFile(filePath),
            url: () => this._serverURL,
            title: () => this._title,
            description: () => this._description,
        };
    }

    public get layouts(): string {
        return this._layouts;
    }

    public get partials(): string {
        return this._partials;
    }

    public get pages(): string {
        return this._pages;
    }

}
