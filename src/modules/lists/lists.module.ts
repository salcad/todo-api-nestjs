import { Module } from '@nestjs/common';

import { CategoriesModule } from '../categories/categories.module';

import { ListsController } from './lists.controller';
import { listsProviders } from './lists.providers';
import { ListsService } from './lists.service';

@Module({
  providers: [ListsService, ...listsProviders],
  controllers: [ListsController],
  imports: [CategoriesModule],
})
export class ListsModule {}
