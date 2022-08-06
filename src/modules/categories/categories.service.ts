import { Injectable, Inject } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from '../../core/constants';
import { ListItem } from '../listItems/listItem.entity';
import { List } from '../lists/list.entity';

import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  async getAll(userId: string): Promise<Category[]> {
    return await this.categoryRepository.findAll<Category>({
      where: {
        userId,
      },
      include: [
        {
          model: List,
          include: [{ model: ListItem }],
        },
      ],
    });
  }

  async get(id: number) {
    const options = {
      where: {
        id,
      },
      include: [
        {
          model: List,
          include: [
            {
              model: ListItem,
            },
          ],
        },
      ],
    };
    return await this.categoryRepository.findOne<Category>(options);
  }

  async create(userId: string, title: string): Promise<Category> {
    return await this.categoryRepository.create({
      userId,
      title,
    });
  }

  async updateTitle(id: number, title: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: List,
          include: [
            {
              model: ListItem,
            },
          ],
        },
      ],
    });
    category.title = title;
    await category.save();
    await category.reload();
    return category;
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    await category.destroy();
    return true;
  }
}
