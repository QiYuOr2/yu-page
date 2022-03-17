import { yuRequest } from '@/common/request';

export type Page = {
  id: string;
  schema: string;
  name: string;
  description: string;
  isPublish: boolean;
  isPublic?: boolean;
  userId?: number;
};

type CreatePageDto = Omit<Page, 'id' | 'isPublic' | 'userId'>;

export const page = {
  async get(id: string) {
    return yuRequest<Page>({
      url: 'page',
      method: 'get',
      data: { pageId: id },
    });
  },

  async list(userId: number) {
    return yuRequest<Page[]>({
      url: 'page/list',
      method: 'get',
      data: { userId },
    });
  },

  async create(userId: number, page: CreatePageDto) {
    return yuRequest<{ id: string }>({
      url: 'page/create',
      method: 'post',
      data: { userId, ...page },
    });
  },

  async remove(id: string) {
    return yuRequest({
      url: 'page/delete',
      method: 'post',
      data: { pageId: id },
    });
  },
};
