import _wrapRootElement from "./wrapRootElement";

export const onInitialClientRender = () => {
  const node = document.querySelector("[data-ssr-styles]");
  node && node.parentNode && node.parentNode.removeChild(node);
};

export const wrapPageElement = ({ element }) => _wrapRootElement(element);
