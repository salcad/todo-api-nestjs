import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Category } from '../categories/category.entity';
import { ListItem } from '../listItems/listItem.entity';

@Table
export class List extends Model<List> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  pinned: string;

  @BelongsTo(() => Category, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE',
  })
  category: Category;

  @HasMany(() => ListItem, {
    foreignKey: 'listId',
    onDelete: 'CASCADE',
  })
  listItems: ListItem[];
}
