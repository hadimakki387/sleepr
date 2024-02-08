import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports:[NestConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGO_URI: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION: Joi.number().required(),
            AUTH_PORT: Joi.number().required(),
            RESERVATION_PORT: Joi.number().required(),
        })
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
