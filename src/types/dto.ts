export type ComponentDto = {
  type: { name: string; label: string };
  name: string;
  label: string;
  icon: string;
  commonStyleKeys: string[];
  props: Record<string, any>;
};
