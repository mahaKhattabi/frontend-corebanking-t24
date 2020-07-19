import React, { FunctionComponent } from "react";
import Navbar from "components/Navbar";
import { Row, Col, Card, Container } from "reactstrap";
import Sidebar from "components/Sidebar";
import { Redirect } from "react-router-dom";
import Footer from "components/Footer";

const Admin: FunctionComponent = (props) => {
  const authUser = localStorage.getItem("role");

  return authUser === "admin" ? (
    <React.Fragment>
      <Navbar />
      <Container>
        <Row className='admin-container'>
          <Col md={3}>
            <Card className='content-card margin-bottom-30'>
              <Sidebar />
            </Card>
          </Col>
          {props.children}
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  ) : (
    <Redirect to='/' />
  );
};

export default Admin;
