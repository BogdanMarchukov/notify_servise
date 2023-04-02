import {
  Column,
  CreatedAt,
  DataType,
  Default,
  IsIn,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { BaseModel } from './Base.model';

enum NotificationStatus {
  Pending = 'pending',
  Complete = 'complete',
}

@Table({ tableName: 'notifications', modelName: 'notification' })
export class Notification extends BaseModel<Notification> {
  @Column
  template: string;

  @IsIn([[NotificationStatus.Pending, NotificationStatus.Complete]])
  @Column(DataType.STRING)
  status: NotificationStatus;
}
