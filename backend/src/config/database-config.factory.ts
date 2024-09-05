import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      useUTC: true,
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      database: this.configService.get<string>('database.name'),
      schema: this.configService.get<string>('database.schema'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
    };
  }
}
