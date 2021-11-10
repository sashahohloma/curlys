import { default as fs } from 'fs';
import { HelperDelegate, HelperOptions } from 'handlebars';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { jsonParse, stringOr } from '@sashahohloma/utilities';
import { ServerConfig } from './server.config';
import { BusinessConfig } from './business.config';
import { InstagramConfig } from './instagram.config';

@Injectable()
export class HandlebarsConfig {

    private readonly serverConfig: ServerConfig;
    private readonly businessConfig: BusinessConfig;
    private readonly instagramConfig: InstagramConfig;

    private readonly _layouts: string;
    private readonly _partials: string;
    private readonly _pages: string;

    private readonly _title: string;
    private readonly _description: string;

    constructor(
        serverConfig: ServerConfig,
        businessConfig: BusinessConfig,
        instagramConfig: InstagramConfig,
    ) {

        this._layouts = serverConfig.resolveTemplates('layouts');
        this._partials = serverConfig.resolveTemplates('partials');
        this._pages = serverConfig.resolveTemplates('pages');

        this.serverConfig = serverConfig;
        this.businessConfig = businessConfig;
        this.instagramConfig = instagramConfig;

        this._title = 'Кудряшкин - Закажи трайфл десерт онлайн!';
        this._description = 'Купить свежие трайлф-десерты в Пятигорске с доставкой';
    }

    private getManifestFile(filepath: string): string {
        const file = fs.readFileSync(this.serverConfig.manifest).toString();
        const manifest = jsonParse<Record<string, string>>(file);

        const value = stringOr(manifest[filepath], null);
        if (value === null) {
            throw new InternalServerErrorException(`Ошибка чтения настроек файла ${this.serverConfig.manifest}`);
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
        return this.serverConfig.base + '/product/' + slug;
    }

    private waLink(message: string): string {
        const phone = this.businessConfig.phone.replace(/\D+/g, '');
        const text = encodeURIComponent(message);
        return 'https://wa.me/' + phone + '?text=' + text;
    }

    private orderLink(name: string, quantity: number): string {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const quantityWord = quantity < 4 ? 'штуки' : 'штук';
        const message = `Здравствуйте! Хочу заказать десерт: ${name}, ${quantity} ${quantityWord} в упаковке`;
        return this.waLink(message);
    }

    private instagramProfileLink(username: string): string {
        return this.instagramConfig.baseURL + '/' + username;
    }

    private instagramPostLink(shortcode: string): string {
        return this.instagramConfig.baseURL + '/p/' + shortcode;
    }


    public get helpers(): Record<string, HelperDelegate> {
        return {
            manifest: (filePath: string): string => this.getManifestFile(filePath),
            times: (n: number, block: HelperOptions): string => this.getTimes(n, block),
            isStarActive: (count: number, rating: number): boolean => this.isStarActive(count, rating),
            imageLink: (imageUUID: string): string => this.serverConfig.imageURL(imageUUID),
            productLink: (slug: string): string => this.productLink(slug),
            waLink: (message: string): string => this.waLink(message),
            orderLink: (name: string, quantity: number): string => this.orderLink(name, quantity),
            instagramProfileLink: (username: string): string => this.instagramProfileLink(username),
            instagramPostLink: (shortcode: string): string => this.instagramPostLink(shortcode),
            url: () => this.serverConfig.base,
            pageTitle: () => this._title,
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
