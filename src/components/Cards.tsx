import React, { FunctionComponent } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";

interface PictureProps {
  image: string;
  name: string;
  description: string;
  link: string;
}

export const PictureCard: FunctionComponent<PictureProps> = (props) => (
  <Link to={props.link}>
    <div className='tile'>
      <img src={props.image} alt='' />
      <div className='text'>
        <h1>{props.name}</h1>
        <h2 className='animate-text'>{"Description"}</h2>
        <p className='animate-text'>{_.take(props.description, 150)}</p>
        <div className='dots'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </Link>
);

interface SimpleProps {
  name: string;
  link: string;
}

export const SimpleCard: FunctionComponent<SimpleProps> = (props) => (
  <a href={props.link} className='pure-link'>
    <Card className='card-link'>
      <CardBody className='text-center'>
        <div className='text-center'>
          <h3>{props.name}</h3>
        </div>
      </CardBody>
    </Card>
  </a>
);
