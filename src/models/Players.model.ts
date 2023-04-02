import {
  Column,
  CreatedAt,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'players', modelName: 'player' })
export class Player extends Model<Player> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
  @Column
  first_name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
