import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class NotifyDto {
  @Expose()
  @IsString()
  template: string;
}
