import { default as fs } from 'fs';
import { HelperDelegate, HelperOptions } from 'handlebars';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { jsonParse, stringOr } from '@sashahohloma/utilities';
import { ServerConfig } from './server.config';
import { BusinessConfig } from './business.config';

@Injectable()
export class HandlebarsConfig {

    private readonly _layouts: string;
    private readonly _partials: string;
    private readonly _pages: string;

    private readonly _phone: string
    private readonly _serverURL: string;
    private readonly _manifest: string;

    private readonly _title: string;
    private readonly _description: string;

    constructor(
        serverConfig: ServerConfig,
        businessConfig: BusinessConfig,
    ) {
        this._layouts = serverConfig.resolveTemplates('layouts');
        this._partials = serverConfig.resolveTemplates('partials');
        this._pages = serverConfig.resolveTemplates('pages');

        this._phone = businessConfig.phone;
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

    private getTimes(n: number, block: HelperOptions): string {
        let acc = '';
        for (let index = 1; index <= n; index++) {
            acc += block.fn(index);
        }
        return acc;
    }

    private isStarActive(count: number, rating: number): boolean {
        return count <= rating;
    }

    private productLink(slug: string): string {
        return 'product/' + slug;
    }

    private waLink(message: string): string {
        const phone = this._phone.replace(/\D+/g, '');
        const text = encodeURIComponent(message);
        return 'https://wa.me/' + phone + '?text=' + text;
    }

    public get helpers(): Record<string, HelperDelegate> {
        return {
            manifest: (filePath: string): string => this.getManifestFile(filePath),
            times: (n: number, block: HelperOptions): string => this.getTimes(n, block),
            isStarActive: (count: number, rating: number): boolean => this.isStarActive(count, rating),
            productLink: (slug: string): string => this.productLink(slug),
            waLink: (message: string): string => this.waLink(message),
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
