import React from "react";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createGenerateClassName } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/styles/theme";

let context;

export const getSheetsRegistry = () => context && context.sheetsRegistry;

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}


function getPageContext() {
  let context;
  if (!process.browser) {
    context = createPageContext();
  } else {
    if (!global.__MUI_PAGE_CONTEXT__) {
      global.__MUI_PAGE_CONTEXT__ = createPageContext();
    }
    context = global.__MUI_PAGE_CONTEXT__;
  }
  return context;
}

const wrapRootElement = element => {
  context = getPageContext(); 
  const { theme, sheetsManager, sheetsRegistry, generateClassName } = context;
  return (
    <JssProvider generateClassName={generateClassName} registry={sheetsRegistry}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <CssBaseline />  
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};

export default wrapRootElement;
