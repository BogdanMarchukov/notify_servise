import { Body, Controller, Post } from '@nestjs/common';
import { NotifyDto } from '../../dto/notify.dto';

@Controller()
export class NotifyController {
  @Post('send')
  sendNotify(@Body() body: NotifyDto) {

  }
}
