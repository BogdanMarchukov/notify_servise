import { Injectable } from '@nestjs/common';
import { Player } from '../../models/Players.model';
import { Notification } from '../../models/Notification.modle';
import { NotificationStatus } from '../../models/UsersNotification.model';

@Injectable()
export class NotifyService {
  async notifySender(template: string) {
    const notification = await Notification.create({
      template,
      status: NotificationStatus.Pending,
    });
    const users = await this.getUsers(0, 10);
    console.log(users);
    template = this.findNameAndReplace(template, 'bogdan');
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
}
