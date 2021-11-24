import { ComponentDto, StyleDto } from './dto';

export type FormattedComponent = {
  name: string;
  label: string;
  children: {
    name: string;
    label: string;
    icon: string;
    commonStyleKeys: string[];
    props: Record<string, any>;
  }[];
};

export type YuResponse<T> = {
  status: { code: number; message: string; description: string };
  result: { data: T };
};

export type Schema = ComponentDto & {
  id: string;
  styles: Record<string, StyleDto>;
};
