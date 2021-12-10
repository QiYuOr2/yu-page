export type ComponentDto = {
  type: { name: string; label: string };
  name: string;
  label: string;
  icon: string;
  commonStyleKeys: string[];
  props: Record<string, any>;
};

export type PresetType = {
  name: string;
  previewStyles: Record<string, string[]>;
  styles: Record<string, string[]>;
};

export type StyleDto = {
  name: string;
  label: string;
  val: string | number;
  unit?: string[];
  selectUnit?: string;
  type?: string;
  preset?: (string | number | StyleDto | PresetType)[];
  from?: string;
  children: Record<string, StyleDto>;
};
