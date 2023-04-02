import { Injectable } from '@nestjs/common';
import { Player } from '../../models/Players.model';
import { Notification } from '../../models/Notification.modle';
import {
  NotificationStatus,
  UserNotification,
} from '../../models/UsersNotification.model';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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
      const users = await this.getUsers(offset, 100);
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
          await this.sendVkApi(vkData, text, userNotificationData);
          text = this.findNameAndReplace(template, user.first_name);
          vkData.length = 0;
          userNotificationData.length = 0;
          lastUserName = user.first_name;
        }
      }

      await this.sendVkApi(vkData, text, userNotificationData);
      offset = offset + 100;
    }
    // console.log(users);
    // template = this.findNameAndReplace(template, 'bogdan');
  }

  findNameAndReplace(template: string, firstName: string) {
    return template.replace(/{user_name}/g, firstName);
  }

  async getUsers(offset: number, limit: number) {
    return Player.findAll({
      offset,
      limit,
      order: [['first_name', 'ASC']],
      logging: true,
    });
  }

  async sendVkApi(
    vkData: number[],
    text: string,
    userNotificationData: Partial<UserNotification>[],
  ) {
    const [userNotification, responseVk] = await Promise.all([
      UserNotification.bulkCreate(userNotificationData),
      firstValueFrom(
        this.httpService
          .post<number[]>(
            'http://localhost:3000/vk-api/sendNotification',
            {
              text,
              ids: vkData,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
      ),
    ]);
    // TODO typing not working Axios response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    const responseVkData: number[] = responseVk.data[0];
    await UserNotification.update(
      {
        status: NotificationStatus.Complete,
      },
      { where: { playerId: responseVkData } },
    );
    return responseVk;
  }
}
