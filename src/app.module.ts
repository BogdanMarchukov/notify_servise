import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotifyModule } from './modules/notify/notify.module';
import databaseConfig from './config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from './models/Players.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('host'),
        port: +configService.get('port'),
        username: configService.get('username'),
        password: configService.get('password'),
        database: configService.get('database'),
        models: [Player],
      }),
      inject: [ConfigService],
    }),
    NotifyModule,
  ],
})
export class AppModule {}
