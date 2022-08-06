import { LIST_ITEMS_REPOSITORY } from '../../core/constants';

import { ListItem } from './listItem.entity';

export const listItemsProviders = [
  {
    provide: LIST_ITEMS_REPOSITORY,
    useValue: ListItem,
  },
];
