import { LIST_REPOSITORY } from '../../core/constants';

import { List } from './list.entity';

export const listsProviders = [
  {
    provide: LIST_REPOSITORY,
    useValue: List,
  },
];
