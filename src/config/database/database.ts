import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): MysqlConnectionOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PW'),
      database: this.configService.get<string>('DB_DB'),
      port: +this.configService.get<number>('DB_PORT'),
      entities: [],
      synchronize: true,
    };
  }
}
