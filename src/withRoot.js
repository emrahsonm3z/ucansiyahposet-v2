import React from "react";
import { jss } from "react-jss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "./getPageContext";

import JMHThineot from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.eot";
import JMHThinotf from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.otf";
import JMHThinsvg from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.svg";
import JMHThinttf from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.ttf";
import JMHThinwoff from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.woff";
import JMHThinwoff2 from "./styles/font/JMHTypewriter-Thin/fonts/JMHTypewriter-Thin.woff2";

jss
  .createStyleSheet({
    "@global html, body": {
      fontFamily: "JMHTypewriter-Thin"
    }
  })
  .attach();

jss
  .createStyleSheet({
    "@font-face": {
      fontFamily: "JMHTypewriter-Thin",
      fontWeight: "normal",
      fontStyle: "normal",
      src: `url(${JMHThineot}),
    url(${JMHThinotf}) format("opentype"),
    url(${JMHThinttf}) format("truetype"),
    url(${JMHThinwoff}) format("woff"),
    url(${JMHThinwoff2}) format("woff2")`
    }
  })
  .attach();
// jss
//   .createStyleSheet({
//     "@font-face": {
//       fontFamily: "JMHTypewriter-Thin",
//       fontWeight: "normal",
//       fontStyle: "normal",
//       src: `url(${JMHThinwoff}) format("woff")`
//     }
//   })
//   .attach();

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props) {
      super(props);
      this.muiPageContext = getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider jss={jss} generateClassName={this.muiPageContext.generateClassName}>
          <MuiThemeProvider
            theme={this.muiPageContext.theme}
            sheetsManager={this.muiPageContext.sheetsManager}
          >
            <CssBaseline />
            <Component {...this.props} />
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;

/*
import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext from "./getPageContext";

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props) {
      super(props);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#server-side-jss");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >

          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object
  };

  return WithRoot;
}

export default withRoot;

*/
