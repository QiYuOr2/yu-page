/**
 * 路由
 */
export const ROUTER = {
  HOME: 'home',
  WORKBANCH: 'workbanch',
  PREVIEW: 'preview',
  LOGIN: 'login',
  P: 'p',
};

/**
 * iframe editor相关
 */
export const FRAME = {
  VIEW_ID: 'editorContent',
  YU_COMPONENT_ID_PREFIX: 'yu-render-id_component_',
  TOOL_ID: 'editorToolsId',
  CONTAINER_HEIGHT: 667,
};

export const MESSAGE_TYPE = {
  INIT: 'init',
  CHANGE_INDEX: 'changeIndex',
  CHANGE_PROPS: 'changeProps',
  SET_CONFIG: 'setConfig',
  GET_CONFIG: 'getConfig',
  RETURN_CONFIG: 'returnConfig',
  SORT_COMPONENT: 'sortComponent',
  COPY_COMPONENT: 'copyComponent',
  DELETE_COMPONENT: 'deleteComponent',
  ADD_COMPONENT: 'addComponent',
  BEFORE_ADD_COMPONENT: 'beforeAddComponent',
  AFTER_ADD_COMPONENT: 'afterAddComponent',
};

export const STATE = {
  EDIT: 'editState',
};

export const COOKIE = {
  TOKEN: 'token',
  UID: 'uid',
};
