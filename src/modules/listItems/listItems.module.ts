import { Module } from '@nestjs/common';

import { ListItemsController } from './listItems.controller';
import { listItemsProviders } from './listItems.providers';
import { ListItemsService } from './listItems.service';

@Module({
  providers: [ListItemsService, ...listItemsProviders],
  controllers: [ListItemsController],
})
export class ListItemsModule {}
