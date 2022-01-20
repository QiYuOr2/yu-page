export function useFrameAction(id: string) {
  const injectEventListener = () => {
    const contentInFrame = (
      document.getElementById(id) as HTMLIFrameElement
    ).contentWindow?.document.getElementById('editorContent');

    console.log(contentInFrame)

    contentInFrame?.addEventListener('click', (e) => {
      console.log('iframe click');
    });

    contentInFrame?.addEventListener('mouseover', (e) => {
      console.log('iframe mouseover');
    });
  };

  return { injectEventListener };
}
