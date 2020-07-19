import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "index.css";
import "styles/card.scss";
import "styles/search.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "routes";

import Layout from "layouts/Default";
import AdminLayout from "layouts/Admin";
import { RestfulProvider } from "restful-react";

const App = () => {
  const authToken = localStorage.getItem("token");
  const host = `${process.env["REACT_APP_HOST_NODE"]}`;

  return (
    <RestfulProvider
      base={host}
      requestOptions={{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }}
    >
      <Router>
        <Switch>
          <Route path='/auth' render={() => <Routes.AuthRoutes />} />
          <Route
            path='/admin'
            render={() => (
              <AdminLayout>
                <Routes.AdminRoutes />
              </AdminLayout>
            )}
          />
          <Route
            path='/'
            render={() => (
              <Layout>
                <Routes.Routes />
              </Layout>
            )}
          />
        </Switch>
      </Router>
    </RestfulProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
