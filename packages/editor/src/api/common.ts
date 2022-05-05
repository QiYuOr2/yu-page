import { yuRequest } from '@/common/request';

export const upload = (file: any) => {
  const body = new FormData();
  body.append('avatar', file);
  return yuRequest<string>({
    url: 'common/upload',
    method: 'post',
    data: body,
  });
};
