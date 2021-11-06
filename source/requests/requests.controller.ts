import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class RequestsController {

    @Get()
    @Render('main')
    root() {
        return { message: 'Hello world' };
    }

}
