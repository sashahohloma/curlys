import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class BusinessConfig {

    private readonly _phone: string;

    constructor(configService: ConfigService) {
        this._phone = configService.getString('BUSINESS_PHONE');
    }

    public get phone() {
        return this._phone;
    }
}
