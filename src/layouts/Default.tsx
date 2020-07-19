import React, { FunctionComponent } from "react";
import Navbar from "components/Navbar";
import { Redirect } from "react-router-dom";
import Footer from "components/Footer";

const DefaultLayout: FunctionComponent = (props) => {
  const authUser = localStorage.getItem("role");
  return authUser ? (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </React.Fragment>
  ) : (
    <Redirect to='/auth/login' />
  );
};

export default DefaultLayout;
