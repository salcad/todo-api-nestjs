import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.providers';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesService, ...categoriesProviders],
  controllers: [CategoriesController],
  exports: [...categoriesProviders],
})
export class CategoriesModule {}
