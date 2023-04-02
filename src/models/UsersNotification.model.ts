import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsIn,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from './Base.model';
import { Notification } from './Notification.modle';
import { Player } from './Players.model';

export enum NotificationStatus {
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

  @BelongsTo(() => Player, 'playerId')
  playerId: Player;

  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  Player: string;
}
