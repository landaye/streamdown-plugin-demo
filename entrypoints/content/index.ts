import ReactDOM from 'react-dom/client';
import { createShadowRootUi } from "#imports";
import React from 'react';
import streamdown from './streamdown.tsx';
//导入css
import appStyles from './style.css?inline';
import markdownStyles from './Markdown.css?inline';

export default defineContentScript({
  matches: ['*://*/*'],//匹配所有域名下的页面
  async main(ctx) {
    console.log('Hello content wxt-react-streamdown-demo');
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-streamdown-demo",
      position: "overlay",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const wrapper = document.createElement("div");
        wrapper.id = 'wxt-react-streamdown-demo-wrapper';
        container.append(wrapper);
        //注入css
        const style = document.createElement('style');
        style.textContent = appStyles.toString();
        container.append(style);
        //注入markdown css
        const markdownStyle = document.createElement('style');
        markdownStyle.textContent = markdownStyles.toString();
        container.append(markdownStyle);

        const root = ReactDOM.createRoot(wrapper);
        root.render(React.createElement(streamdown));
        return { root, wrapper, style, markdownStyle };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
        elements?.style.remove();
      },
    });
    ui.mount();
  },
});
