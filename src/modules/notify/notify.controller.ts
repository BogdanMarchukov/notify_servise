import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { NotifyDto } from './notify.dto';
import { NotifyService } from './notify.service';

@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}
  @Post('send')
  async sendNotify(@Body(new ValidationPipe()) body: NotifyDto) {
    let { template } = body;
    await this.notifyService.notifySender(template);
    const users = await this.notifyService.getUsers(0, 10);
    console.log(users);
    template = this.notifyService.findNameAndReplace(template, 'bogdan');
    return {
      text: template,
    };
  }
}
