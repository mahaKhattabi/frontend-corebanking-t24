import React, { FunctionComponent } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Domains from "views/website/Domains";
import Processes from "views/website/Processes";
import Tables from "views/website/Tables";

import DomainsShow from "views/website/Domains/show";
import ProcessesShow from "views/website/Processes/show";
import TablesShow from "views/website/Tables/show";
import TablesVersions from "views/website/Tables/versions";
import TablesContent from "views/website/Tables/content";

// import Dashboard from "views/admin/dashboard";

import IndexDomaines from "views/admin/domains";
import CreateDomaines from "views/admin/domains/create";
import EditDomaines from "views/admin/domains/edit";

import IndexProcessus from "views/admin/processes";
import CreateProcessus from "views/admin/processes/create";
import EditProcessus from "views/admin/processes/edit";

import IndexTables from "views/admin/tables";
import CreateTables from "views/admin/tables/create";
import EditTables from "views/admin/tables/edit";

import IndexUsers from "views/admin/users";
import CreateUsers from "views/admin/users/create";
import EditUsers from "views/admin/users/edit";

import IndexContent from "views/admin/uploads";
import CreateContent from "views/admin/uploads/upload";

import Login from "views/auth/login";
import Register from "views/auth/register";
import ShowContent from "views/admin/uploads/content";
import VersionsContent from "views/admin/uploads/versions";

export const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path='/domains' component={Domains} />
    <Route exact path='/process' component={Processes} />
    <Route exact path='/tables' component={Tables} />

    <Route exact path='/domains/:id' component={DomainsShow} />
    <Route exact path='/processes/:id' component={ProcessesShow} />
    <Route exact path='/tables/:id' component={TablesShow} />
    <Route exact path='/tables/:name/content' component={TablesContent} />
    <Route exact path='/tables/:name/versions' component={TablesVersions} />

    <Redirect exact from='/' to='/domains' />
  </Switch>
);

export const AdminRoutes: FunctionComponent = () => (
  <Switch>
    {/* <Route exact path='/admin' component={Dashboard} /> */}

    <Route exact path='/admin/domains' component={IndexDomaines} />
    <Route exact path='/admin/domains/create' component={CreateDomaines} />
    <Route exact path='/admin/domains/:id/edit' component={EditDomaines} />

    <Route exact path='/admin/process' component={IndexProcessus} />
    <Route exact path='/admin/process/create' component={CreateProcessus} />
    <Route exact path='/admin/process/:id/edit' component={EditProcessus} />

    <Route exact path='/admin/tables' component={IndexTables} />
    <Route exact path='/admin/tables/create' component={CreateTables} />
    <Route exact path='/admin/tables/:id/edit' component={EditTables} />

    <Route exact path='/admin/users' component={IndexUsers} />
    <Route exact path='/admin/users/create' component={CreateUsers} />
    <Route exact path='/admin/users/:id/edit' component={EditUsers} />

    <Route exact path='/admin/contents' component={IndexContent} />
    <Route exact path='/admin/contents/create' component={CreateContent} />
    <Route exact path='/admin/contents/:name' component={ShowContent} />
    <Route
      exact
      path='/admin/contents/:name/versions'
      component={VersionsContent}
    />

    <Redirect exact from='/admin' to='/admin/domains' />
  </Switch>
);

export const AuthRoutes: FunctionComponent = () => (
  <Switch>
    <Route exact path='/auth/login' component={Login} />
    <Route exact path='/auth/register' component={Register} />
  </Switch>
);
