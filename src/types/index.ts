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
