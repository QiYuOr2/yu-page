import { reactive, nextTick } from 'vue';
import { FRAME, MESSAGE_TYPE } from '@/common/constants';
import { useEditStore } from '@/store';
import { el } from '@/common/utils';
import { useState } from './useState';

/**
 * 向上层遍历节点
 */
function loopNodes(node: HTMLElement, handler: (node: HTMLElement) => void) {
  while (node.tagName !== 'HTML') {
    handler(node);
    node = node.parentNode as HTMLElement;
  }
}

const StyleType = {
  Tool: 'tool',
  Active: 'active',
  Hover: 'hover',
};

export function useFrameAction(id: string) {
  const initialStyle = { height: '0px', top: '-1000px' };

  const [toolStyle, setToolStyle] = useState(initialStyle);
  const [activeStyle, setActiveStyle] = useState(initialStyle);
  const [hoverStyle, setHoverStyle] = useState(initialStyle);

  const editorState = reactive({
    toolStyle,
    activeStyle,
    hoverStyle,
    containerHeight: FRAME.CONTAINER_HEIGHT,
    isTop: false,
    isBottom: false,
    current: 0,
    dragableComponents: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      index: number;
    }>,
  });

  const frameDoc = () =>
    (document.getElementById(id) as HTMLIFrameElement)?.contentWindow
      ?.document!;

  const frameView = () => frameDoc().getElementById(FRAME.VIEW_ID);

  /**
   * 重新计算iframe高度
   */
  const resetFrameHeight = (addBlank: boolean | number = true) => {
    const iframe = document.getElementById(id) as HTMLIFrameElement;
    const body = frameDoc().body;
    // console.log(body.scrollHeight);
    iframe.height = `${
      body.scrollHeight +
      (addBlank ? (typeof addBlank === 'number' ? addBlank : 300) : 0)
    }px`;
    return iframe.height;
  };

  const setStyle = (type: string, height: string, top: number) => {
    switch (type) {
      case StyleType.Tool:
        setToolStyle({ height, top: `${top}px` });
        break;
      case StyleType.Active:
        setActiveStyle({ height, top: `${top - 3}px` });
        break;
      case StyleType.Hover:
        setHoverStyle({ height, top: `${top - 3}px` });
        break;
    }
    nextTick(() => {
      setToolStyle({ height, top: `${top + 3}px` });
      // const toolNode = document.getElementById(FRAME.TOOL_ID)!;
      // const toolHeight = parseInt(getComputedStyle(toolNode).height, 10);
      // setToolStyle({
      //   top: `${
      //     top + toolHeight > editorState.containerHeight
      //       ? top - toolHeight + parseInt(height, 10)
      //       : top
      //   }px`,
      // });
    });
  };

  const setCurrentComponent = (
    nodesWrapper: HTMLElement,
    currentId: string,
    afterSelect?: (index: number) => void
  ) => {
    const components = Array.from(
      nodesWrapper.querySelectorAll(`[id^=${FRAME.YU_COMPONENT_ID_PREFIX}]`)
    );
    components.forEach((_node, index) => {
      const id = (_node as HTMLElement).getAttribute?.('id');
      if (currentId === id) {
        editorState.isTop = index === 0;
        editorState.isBottom = index === components.length - 1;
        editorState.current = index;
        afterSelect?.(index);
      }
    });
  };

  const injectEventListener = (
    afterSelect: (event: 'click' | 'mouseover', index: number) => void
  ) => {
    const contentInFrame = frameView()!;

    resetFrameHeight();

    contentInFrame.addEventListener('click', (e) => {
      loopNodes(e.target as HTMLElement, (node) => {
        const currentId = node?.getAttribute('id') ?? '';
        if (currentId.indexOf(FRAME.YU_COMPONENT_ID_PREFIX) >= 0) {
          setStyle(StyleType.Active, el(node).height(), el(node).top());

          setCurrentComponent(contentInFrame, currentId, (index) =>
            afterSelect('click', index)
          );
        }
      });
    });

    contentInFrame.addEventListener('mouseover', (e) => {
      loopNodes(e.target as HTMLElement, (node) => {
        const currentId = node?.getAttribute('id') ?? '';
        if (currentId.indexOf(FRAME.YU_COMPONENT_ID_PREFIX) >= 0) {
          setStyle(StyleType.Hover, el(node).height(), el(node).top());

          setCurrentComponent(contentInFrame, currentId, (index) =>
            afterSelect('mouseover', index)
          );
        }
      });
    });
  };

  const editStore = useEditStore();
  const shouldResetList = [
    MESSAGE_TYPE.ADD_COMPONENT,
    MESSAGE_TYPE.DELETE_COMPONENT,
    MESSAGE_TYPE.CHANGE_INDEX,
  ];
  const injectIframeMessageListener = () => {
    addEventListener('message', (e) => {
      const doc = frameDoc();
      if (!e.data.type) return;

      if (e.source === window || e.data === 'loaded') {
        return;
      }
      if (e.data.type === MESSAGE_TYPE.RETURN_CONFIG) {
        editStore.updateEditConfig(e.data.data);
        editStore.updatePageConfig(e.data.data);

        // TODO 重置高亮
        setTimeout(() => {
          const { source } = e.data.data;

          if (shouldResetList.includes(source)) {
            const activeNode = doc?.querySelector(
              `#${FRAME.YU_COMPONENT_ID_PREFIX}${editStore.editConfig.currentIndex}`
            ) as HTMLElement;

            if (activeNode) {
              setStyle(
                StyleType.Active,
                el(activeNode).height(),
                el(activeNode).top()
              );
              setStyle(StyleType.Hover, '0px', -1000);
            }
          }
        });
      }
    });
  };

  const initState = (index: number) => {
    const contentInFrame = frameView();

    if (!contentInFrame) return;

    // 初始化container高度
    const container = (
      document.getElementById(id) as HTMLIFrameElement
    ).contentWindow?.document.getElementsByTagName('html')[0] as HTMLElement;
    const containerHeight = Math.ceil(
      parseFloat(el(container).height()) + contentInFrame.offsetTop
    );
    editorState.containerHeight =
      containerHeight > FRAME.CONTAINER_HEIGHT
        ? containerHeight
        : FRAME.CONTAINER_HEIGHT;

    // 初始化activeStyle
    if (index === -1) return;
    const node = contentInFrame.querySelectorAll(
      `[id^=${FRAME.YU_COMPONENT_ID_PREFIX}]`
    )[index] as HTMLElement;

    const currentId = node?.getAttribute('id') ?? '';
    // setStyle(StyleType.Active, el(node).height(), el(node).top());

    // 初始化state
    setCurrentComponent(contentInFrame, currentId);
  };

  /**
   * 根据y获取组件index
   * @param y 组件的y值
   */
  const getIndex = (y: number) => {
    const contentInFrame = frameView()!;

    let total = 40;
    let index = 0;

    el(contentInFrame)
      .childNodes()
      .some((_node, i) => {
        total = total + parseInt(el(_node as HTMLElement).height());
        index = i;
        return total > y;
      });
    return index;
  };

  const setFixedStyle = (index: number) => {
    const contentInFrame = frameView();
    editorState.dragableComponents = [];
    (
      Array.from(contentInFrame?.childNodes || []) as Array<HTMLElement>
    ).forEach((_node) => {
      if (_node.getAttribute('data-layout') === 'fixed') {
        const el = _node.childNodes[0];
        const { left, top, width, height } = getComputedStyle(
          el as HTMLElement
        );
        editorState.dragableComponents.push({
          x: parseInt(left),
          y: parseInt(top),
          width: parseInt(width, 10),
          height: parseInt(height, 10),
          index,
        });
      }
    });
  };

  const postMessage = <T>(msg: T) => {
    const iframe = (document.getElementById(id) as HTMLIFrameElement)
      .contentWindow;
    iframe?.postMessage(msg);
  };

  return {
    injectEventListener,
    initState,
    getIndex,
    setFixedStyle,
    editorState,
    postMessage,
    editStore,
    injectIframeMessageListener,
    resetFrameHeight,
  };
}
