import React, { FunctionComponent } from "react";
import { Spinner } from "reactstrap";
import classNames from "classnames";

const Loading: FunctionComponent<{ centerScreen?: boolean }> = (props) => (
  <div className={classNames({ "text-center centered": props.centerScreen })}>
    <div>
      <Spinner color='dark' />
    </div>
    {props.children}
  </div>
);

export default Loading;
