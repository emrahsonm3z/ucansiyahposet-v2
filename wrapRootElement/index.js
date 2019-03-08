import { compose } from "lodash/fp";
import redux from "./redux";
import mui from "./mui";

export default element => {
  return compose(
    redux,
    mui
  )(element);
};
