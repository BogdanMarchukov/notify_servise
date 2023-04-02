import { Injectable } from '@nestjs/common';
import { Player } from '../../models/Players.model';
import { Notification } from '../../models/Notification.modle';
import {
  NotificationStatus,
  UserNotification,
} from '../../models/UsersNotification.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotifyService {
  constructor(private readonly httpService: HttpService) {}

  async notifySender(template: string) {
    const notification = await Notification.create({
      template,
      status: NotificationStatus.Pending,
    });
    let offset = 0;
    let sending = true;
    let text = template;
    let lastUserName = '';
    while (sending) {
      const users = await this.getUsers(offset, offset + 100);
      if (!users.length) {
        sending = false;
        continue;
      }
      const vkData: number[] = [];
      const userNotificationData: Partial<UserNotification>[] = [];
      for (const user of users) {
        if (!offset) {
          text = this.findNameAndReplace(template, user.first_name);
          lastUserName = user.first_name;
        }
        userNotificationData.push({
          notificationId: notification.id,
          playerId: user.id,
          status: NotificationStatus.Pending,
        });
        vkData.push(user.id);
        if (lastUserName !== user.first_name) {
          await this.sendVkApi(vkData, userNotificationData);
          vkData.length = 0;
          userNotificationData.length = 0;
          lastUserName = user.first_name;
        }
      }
      await this.sendVkApi(vkData, userNotificationData);
      offset = offset + 100;
    }
    // console.log(users);
    // template = this.findNameAndReplace(template, 'bogdan');
  }

  findNameAndReplace(template: string, firstName: string) {
    return template.replace(/{user_name}/g, firstName);
  }

  async getUsers(offset: number, limit: number) {
    return await Player.findAll({
      limit,
      offset,
      order: [['first_name', 'ASC']],
    });
  }

  async sendVkApi(
    vkData: number[],
    userNotificationData: Partial<UserNotification>[],
  ) {
    const userNotification = await UserNotification.bulkCreate(
      userNotificationData,
    );
    // TODO SEND VK and update userNotification
  }
}
