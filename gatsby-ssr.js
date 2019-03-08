import React from "react";
import _wrapRootElement from "./wrapRootElement";
import { getSheetsRegistry } from "./wrapRootElement/mui";

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const sheetsRegistry = getSheetsRegistry();
  if (!sheetsRegistry) return;
  const css = sheetsRegistry.toString();
  const styles = (
    <style key="ssr-styles" data-ssr-styles dangerouslySetInnerHTML={{ __html: css }} />
  );
  const components = getHeadComponents().slice();
  components.push(styles);
  replaceHeadComponents(components);
};

export const wrapPageElement = ({ element }) => {
  return _wrapRootElement(element);
};
