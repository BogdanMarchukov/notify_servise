import { BelongsTo, Column, DataType, ForeignKey, IsIn, Table } from "sequelize-typescript";
import { BaseModel } from './Base.model';
import { Notification } from '../models/Notification.modle';

enum NotificationStatus {
  Pending = 'pending',
  Complete = 'complete',
}
@Table({ tableName: 'user_notification', modelName: 'user_notifications' })
export class UserNotification extends BaseModel<UserNotification> {
  @Column
  @IsIn([[NotificationStatus.Pending, NotificationStatus.Complete]])
  status: NotificationStatus;

  @BelongsTo(() => Notification, 'notificationId')
  notification: Notification;

  @ForeignKey(() => Notification)
  @Column(DataType.UUID)
  notificationId: string;
}
