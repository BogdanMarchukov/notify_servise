import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { NotifyDto } from './notify.dto';
import { NotifyService } from './notify.service';

@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}
  @Post('send')
  async sendNotify(@Body(new ValidationPipe()) body: NotifyDto) {
    const { template } = body;
    await this.notifyService.notifySender(template);
    return {
      text: template,
    };
  }
}
