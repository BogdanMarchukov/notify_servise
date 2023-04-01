import {
  Column,
  Model,
  Table,
  PrimaryKey,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'collections', modelName: 'collection' })
export class Player extends Model {
  @Column
  first_name: string;

  @CreatedAt
  createdAt: Date;
}
