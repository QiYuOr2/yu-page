import { yuRequest } from '@/common/request';

type User = {
  id: number;
  account: string;
  password: string;
  avatar?: string;
};

type CreateAndUpdateUserDto = Omit<User, 'id'>;

export const user = {
  async register(user: CreateAndUpdateUserDto) {
    return yuRequest({
      url: 'user/register',
      method: 'post',
      data: user,
    });
  },

  async login(account: string, password: string) {
    return yuRequest({
      url: 'user/login',
      method: 'post',
      data: { account, password },
    });
  },

  async logout() {
    return yuRequest({
      url: 'user/logout',
      method: 'post',
    });
  },

  async update(id: number, user: CreateAndUpdateUserDto) {
    return yuRequest({
      url: 'user/update',
      method: 'post',
      data: { id, ...user },
    });
  },
};
