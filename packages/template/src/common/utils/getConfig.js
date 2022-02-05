export function getPageConfig() {
  let pageConfig = {};
  const requireConfig = require.context('../../', false, /component.json$/);
  requireConfig.keys().forEach((fileName) => {
    const config = requireConfig(fileName);
    pageConfig = config;
  });

  return pageConfig;
}

export function getComponents() {
  const componentConfig = [];
  const requireConfig = require.context(
    '../../components',
    true,
    /component.json$/
  );
  requireConfig.keys().forEach((fileName) => {
    const config = requireConfig(fileName);
    componentConfig.push(config);
  });

  return componentConfig;
}

export function getDefaultProps(schema) {
  const props = {};
  Object.keys(schema).forEach((key) => {
    const { type, defaultValue, values } = schema[key];
    if (type === 'object') {
      props[key] = getDefaultProps(values);
    } else if (type === 'array') {
      props[key] = [getDefaultProps(values[0])];
    } else {
      props[key] = defaultValue;
    }
  });
  return props;
}
