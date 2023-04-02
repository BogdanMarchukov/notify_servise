import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotifyModule } from './modules/notify/notify.module';
import databaseConfig from './config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from './models/Players.model';
import { Notification } from './models/Notification.modle';
import { UserNotification } from './models/UsersNotification.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      // TODO configuration service is not running. To fix
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'notify',
        models: [Player, Notification, UserNotification],
      }),
      inject: [ConfigService],
    }),
    NotifyModule,
  ],
})
export class AppModule {}
