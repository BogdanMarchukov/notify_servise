import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { VkDto } from './vk.dto';

@Controller('vk-api')
export class VkApiController {
  @Post('sendNotification')
  sendNotification(@Body(new ValidationPipe()) body: VkDto) {
    return [body.ids];
  }
}
