import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { default as expressHbs } from 'express-handlebars';
import { default as handlebars } from 'handlebars';

import { AppModule } from './app.module';
import { ServerConfig } from './config/server.config';
import { HandlebarsConfig } from './config/handlebars.config';

const bootstrap = async() => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = app.get(ServerConfig);
    const hbsConfig = app.get(HandlebarsConfig);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    app.useStaticAssets(config.public);
    app.setBaseViewsDir(config.templates);

    handlebars.registerHelper(hbsConfig.helpers);

    app.setViewEngine('hbs');
    app.engine('hbs', expressHbs({
        layoutsDir: config.templates,
        defaultLayout: 'layout',
        extname: 'hbs',
    }));

    await app.listen(config.port);
};

void bootstrap();
