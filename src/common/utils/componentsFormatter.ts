// Utils
import { reduce, includes, indexOf } from 'lodash';

// Types
import { ComponentDto } from '@/types/dto';
import { FormattedComponent } from '@/types';

export function componentsFormatter(rawComponents: ComponentDto[]) {
  const { componentList } = reduce<ComponentDto, { componentList: FormattedComponent[]; types: string[] }>(
    rawComponents,
    (total, current) => {
      if (includes(total.types, current.type.name)) {
        total.componentList[indexOf(total.types, current.type.name)].children.push(current);
      } else {
        total.types.push(current.type.name);
        total.componentList.push({
          name: current.type.name,
          label: current.type.label,
          children: [current],
        });
      }
      return total;
    },
    { componentList: [], types: [] }
  );

  return componentList;
}
