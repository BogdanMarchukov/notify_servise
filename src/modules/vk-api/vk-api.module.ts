import { Module } from '@nestjs/common';
import { VkApiController } from './vk-api.controller';

@Module({
  controllers: [VkApiController],
})
export class VkApiModule {}
