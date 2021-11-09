import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class InstagramConfig {

    private readonly _baseURL: string;
    private readonly _username: string;
    private readonly _password: string;

    constructor(configService: ConfigService) {
        this._baseURL = configService.getString('INSTAGRAM_BASE_URL');
        this._username = configService.getString('INSTAGRAM_USERNAME');
        this._password = configService.getString('INSTAGRAM_PASSWORD');
    }

    public get baseURL(): string {
        return this._baseURL;
    }

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this._password;
    }
}
