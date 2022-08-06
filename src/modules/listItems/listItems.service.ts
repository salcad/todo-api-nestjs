import { Injectable, Inject } from '@nestjs/common';

import { LIST_ITEMS_REPOSITORY } from '../../core/constants';

import { ListItemDto } from './dto/listItem.dto';
import { ListItem } from './listItem.entity';

@Injectable()
export class ListItemsService {
  constructor(
    @Inject(LIST_ITEMS_REPOSITORY)
    private readonly listItemRepository: typeof ListItem,
  ) {}

  async get(id: number) {
    return await this.listItemRepository.findByPk(id);
  }

  async create(payload: ListItemDto) {
    return await this.listItemRepository.create(payload);
  }

  async update(id: number, payload: ListItemDto) {
    const listItem = await this.listItemRepository.findByPk(id);
    for (const key in payload) {
      listItem[key] = payload[key];
    }
    await listItem.save();
    await listItem.reload();
    return listItem;
  }

  async delete(id: number) {
    const listItem = await this.listItemRepository.findByPk(id);
    await listItem.destroy();
    return true;
  }
}
