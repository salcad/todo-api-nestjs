import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

import { List } from '../lists/list.entity';

@Table
export class ListItem extends Model<ListItem> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  listId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  complete: boolean;

  @BelongsTo(() => List, {
    foreignKey: 'listId',
    onDelete: 'CASCADE',
  })
  list: List;
}
