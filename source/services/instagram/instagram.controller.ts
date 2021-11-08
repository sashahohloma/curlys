import { Get, Controller, Query, Version } from '@nestjs/common';
import { InstagramUserDto } from './instagram.user.dto';
import { InstagramService } from './instagram.service';

@Controller()
export class InstagramController {

    private readonly instagramService: InstagramService;

    constructor(instagramService: InstagramService) {
        this.instagramService = instagramService;
    }

    @Version('1')
    @Get('instagram')
    public async getUser(@Query() query: InstagramUserDto): Promise<string> {
        const response = await this.instagramService.getUser(query.name);
        return response;
    }

}
