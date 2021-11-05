import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class ServerConfig {

    readonly port: number;

    constructor(configService: ConfigService) {
        this.port = configService.getNumber('SERVER_PORT');
    }
}
