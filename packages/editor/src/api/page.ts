import { yuRequest } from '@/common/request';

export type Page = {
  id: string;
  schema: string;
  name: string;
  description: string;
  isPublish: boolean;
  isTemplate: boolean;
  isPublic?: boolean;
  userId?: number;
  thumb?: string;
};

type CreatePageDto = Omit<Page, 'id' | 'userId'>;
type ModifyPageDto = Partial<Omit<Page, 'id' | 'userId'>>;

export const page = {
  async get(id: string) {
    return yuRequest<Page>({
      url: 'page',
      method: 'get',
      data: { pageId: id },
    });
  },

  async list(userId: number, title?: string, sort = 0) {
    return yuRequest<Page[]>({
      url: 'page/list',
      method: 'get',
      data: { userId, title, sort },
    });
  },

  async templates(userId?: number, title?: string) {
    return yuRequest<Page[]>({
      url: 'page/templates',
      method: 'get',
      data: { userId, title },
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

  async modify(id: string, page: ModifyPageDto) {
    return yuRequest({
      url: 'page/modify',
      method: 'post',
      data: { ...page, id },
    });
  },
};
