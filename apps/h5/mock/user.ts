import { faker } from '@faker-js/faker';
import type { MockMethod } from 'vite-plugin-mock';

const CODE_SUCCESS = 200;

const getUserData = () => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.person.fullName(),
  description: faker.lorem.sentence(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  roles: [faker.helpers.arrayElement(['admin', 'user'])],
  status: faker.helpers.arrayElement([0, 1, 2]),
});

export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response: () => {
      return {
        code: CODE_SUCCESS,
        data: {
          token: faker.string.uuid(),
          user: getUserData(),
        },
        message: 'success',
      };
    },
  },
  {
    url: '/mock/user/info',
    method: 'get',
    response: () => {
      return {
        code: CODE_SUCCESS,
        data: getUserData(),
        message: 'success',
      };
    },
  },
  {
    url: '/mock/user/list',
    method: 'get',
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const pageSize = Number(query.pageSize) || 10;

      return {
        code: 200,
        data: {
          list: Array.from({ length: pageSize }, () => getUserData()),
          total: 100,
          page,
          pageSize,
        },
        message: 'success',
      };
    },
  },
] as MockMethod[];
