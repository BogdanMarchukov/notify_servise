import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsArray } from 'class-validator';
@Exclude()
export class VkDto {
  @Expose()
  @IsString()
  text: string;

  @Expose()
  @IsNumber({}, { each: true })
  @IsArray()
  ids: number[];
}
