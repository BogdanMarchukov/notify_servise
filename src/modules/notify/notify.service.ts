import { Injectable } from '@nestjs/common';
import { Player } from '../../models/Players.model';

@Injectable()
export class NotifyService {
  findNameAndReplace(template: string, firstName: string) {
    return template.replace(/{user_name}/g, firstName);
  }

  async getUsers(offset: number, limit: number) {
    return await Player.findAll({
      limit,
      order: [['first_name', 'ASC']],
      logging: true,
    });
  }
}
