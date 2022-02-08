export function el(element: HTMLElement) {
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

    /**
     * 获取所有element节点
     */
    childNodes() {
      return Array.from(element.childNodes).filter(
        (_node) => !['#text', '#comments'].includes(_node.nodeName)
      );
    },
  };
}