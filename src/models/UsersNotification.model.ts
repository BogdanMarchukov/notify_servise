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
@Table({ tableName: 'user_notifications', modelName: 'user_notification' })
export class UserNotification extends BaseModel<UserNotification> {
  @IsIn([[NotificationStatus.Pending, NotificationStatus.Complete]])
  @Column(DataType.STRING)
  status: NotificationStatus;

  @BelongsTo(() => Notification, 'notificationId')
  notification: Notification;

  @ForeignKey(() => Notification)
  @Column(DataType.UUID)
  notificationId: string;

  @BelongsTo(() => Player, 'playerId')
  player: Player;

  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  playerId: number;
}
