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

enum NotificationStatus {
  Pending = 'pending',
  Complete = 'complete',
}

@Table({ tableName: 'notifications', modelName: 'notification' })
export class Notification extends Model<Notification> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: number;
  @Column
  template: string;

  @Column
  @IsIn([[NotificationStatus.Pending, NotificationStatus.Complete]])
  status: NotificationStatus;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
