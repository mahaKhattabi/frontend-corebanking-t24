import React from "react";
import { Container } from "reactstrap";
import { Card } from "@material-ui/core";

export default function Heading(props: {
  header: string;
  description: string | JSX.Element;
  content: string;
  component?: JSX.Element;
}) {
  return (
    <Container>
      <div className='text-center'>
        {/* <h1 className='display-3'>
          {props.content} {props.header}
        </h1> */}
        <div className='content-card'>{props.component && props.component}</div>
        <p className='lead'>
          {props.content} <b>{props.header}</b>
        </p>
        <Card className='content-card-wide text-left' elevation={4} square>
          <p>{props.description}</p>
        </Card>
      </div>
    </Container>
  );
}
