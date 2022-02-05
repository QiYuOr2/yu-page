import { reactive, nextTick } from 'vue';
import { FRAME, MESSAGE_TYPE } from '@/common/constants';
import { useEditStore } from '@/store';
import { fork } from '@/common/utils';

function el(element: HTMLElement) {
  return {
    top() {
      let actualTop = element.offsetTop;
      let current = element.offsetParent as HTMLElement;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent as HTMLElement;
      }

      return actualTop;
    },

    height() {
      return getComputedStyle(element).height;
    },
  };
}

/**
 * 向上层遍历节点
 */
function loopNodes(node: HTMLElement, handler: (node: HTMLElement) => void) {
  while (node.tagName !== 'HTML') {
    handler(node);
    node = node.parentNode as HTMLElement;
  }
}

function useStyle(
  initial: Record<string, string | number>
): [
  Record<string, string | number>,
  (styles: Record<string, string | number>) => void
] {
  const style = reactive(fork(initial));
  const setStyle = (styles: Record<string, string | number>) => {
    Object.keys(styles).forEach((key) => {
      style[key] = styles[key];
    });
  };
  return [style, setStyle];
}

const StyleType = {
  Tool: 'tool',
  Active: 'active',
  Hover: 'hover',
};

export function useFrameAction(id: string) {
  const initialStyle = { height: '0px', top: '0px' };

  const [toolStyle, setToolStyle] = useStyle(initialStyle);
  const [activeStyle, setActiveStyle] = useStyle(initialStyle);
  const [hoverStyle, setHoverStyle] = useStyle(initialStyle);

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

  const frameView = () =>
    (
      document.getElementById(id) as HTMLIFrameElement
    ).contentWindow?.document.getElementById(FRAME.VIEW_ID);

  const setStyle = (type: string, height: string, top: number) => {
    const _top = `${top}px`;
    switch (type) {
      case StyleType.Tool:
        setToolStyle({ height, top: _top });
        break;
      case StyleType.Active:
        setActiveStyle({ height, top: _top });
        break;
      case StyleType.Hover:
        setHoverStyle({ height, top: _top });
        break;
    }
    nextTick(() => {
      const toolNode = document.getElementById(FRAME.TOOL_ID)!;
      const toolHeight = parseInt(getComputedStyle(toolNode).height, 10);
      setToolStyle({
        top: `${
          top + toolHeight > editorState.containerHeight
            ? top - toolHeight + parseInt(height, 10)
            : top
        }px`,
      });
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

  const injectEventListener = (afterSelect: (index: number) => void) => {
    const contentInFrame = frameView();

    contentInFrame?.addEventListener('click', (e) => {
      loopNodes(e.target as HTMLElement, (node) => {
        const currentId = node?.getAttribute('id') ?? '';
        if (currentId.indexOf(FRAME.YU_COMPONENT_ID_PREFIX) >= 0) {
          setStyle(StyleType.Active, el(node).height(), el(node).top());

          setCurrentComponent(contentInFrame, currentId, (index) =>
            afterSelect(index)
          );
        }
      });
    });

    contentInFrame?.addEventListener('mouseover', (e) => {
      loopNodes(e.target as HTMLElement, (node) => {
        const currentId = node?.getAttribute('id') ?? '';
        if (currentId.indexOf(FRAME.YU_COMPONENT_ID_PREFIX) >= 0) {
          setStyle(StyleType.Hover, el(node).height(), el(node).top());

          setCurrentComponent(contentInFrame, currentId, (index) =>
            afterSelect(index)
          );
        }
      });
    });
  };

  const editStore = useEditStore();
  const injectIframeMessageListener = () => {
    addEventListener('message', (e) => {
      if (!e.data.type) return;

      if (e.source === window || e.data === 'loaded') {
        return;
      }
      if (e.data.type === MESSAGE_TYPE.RETURN_CONFIG) {
        editStore.updateEditConfig(e.data.data);
        editStore.updatePageConfig(e.data.data);
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

    Array.from(contentInFrame.childNodes).some((_node, i) => {
      total = total + parseInt(el(_node as HTMLElement).height());
      if (total > y) {
        index = i;
        return true;
      }
      index = i;
      return false;
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
  };
}
