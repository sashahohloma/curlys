import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class BusinessConfig {

    private readonly _phone: string;
    private readonly _instagram: string;

    constructor(configService: ConfigService) {
        this._phone = configService.getString('BUSINESS_PHONE');
        this._instagram = configService.getString('BUSINESS_INSTAGRAM');
    }

    public get phone() {
        return this._phone;
    }

    public get instagram() {
        return this._instagram;
    }
}
