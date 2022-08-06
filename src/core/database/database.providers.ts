import { Sequelize } from 'sequelize-typescript';

import { Category } from '../../modules/categories/category.entity';
import { ListItem } from '../../modules/listItems/listItem.entity';
import { List } from '../../modules/lists/list.entity';
import { User } from '../../modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';

import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      console.log('config:' + JSON.stringify(config, null, 2));
      sequelize.addModels([User, Category, List, ListItem]);
      await sequelize.sync({ logging: console.log });
      return sequelize;
    },
  },
];
