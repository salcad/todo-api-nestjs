import { Inject, Injectable } from '@nestjs/common';

import { Op } from 'sequelize';

import { LIST_REPOSITORY, CATEGORY_REPOSITORY } from '../../core/constants';
import { Category } from '../categories/category.entity';
import { ListItem } from '../listItems/listItem.entity';

import { ListDto } from './dto/list.dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @Inject(LIST_REPOSITORY) private readonly listRepository: typeof List,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  async get(id: number): Promise<List> {
    return await this.listRepository.findOne({
      where: { id },
      include: [{ model: ListItem, attributes: { exclude: ['password'] } }],
    });
  }

  async getAllList(categoryId: string): Promise<List[]> {
    return await this.listRepository.findAll<List>({
      where: {
        id: categoryId,
      },
      include: [{ model: List, attributes: { exclude: ['password'] } }],
    });
  }

  async getPinned(userId: string): Promise<List[]> {
    await List.sync();
    return await List.findAll<List>({
      where: {
        [Op.and]: [{ userId }, { pinned: true }],
      },
      include: [
        {
          model: ListItem,
        },
      ],
    });
  }

  async create(
    categoryId: number,
    title: string,
    userId: string,
  ): Promise<List> {
    return await List.create({
      categoryId,
      userId,
      title,
      pinned: false,
    });
  }

  async update(id: number, payload: ListDto): Promise<List> {
    const list = await List.findByPk(id);
    for (const key in payload) {
      list[key] = payload[key];
    }
    await list.save();
    await list.reload();
    return list;
  }

  async delete(id: number): Promise<boolean> {
    const list = await List.findByPk(id);
    await list.destroy();
    return true;
  }
}
