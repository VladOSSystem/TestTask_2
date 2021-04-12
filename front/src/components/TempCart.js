import React from 'react';
import { 
    Col, 
    Card, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
} from "reactstrap";

const TempCart = (props) => {
  const { 
    timestamp, 
    temp, 
    weather, 
    country, 
    city,
   } = props.weather;
   const date = new Date(timestamp * 1000); 
    return (
        <Col sm className="mt-2">
        <Card>
        <CardBody>
          <CardTitle tag="h5"><span>{country}</span>/{city}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Weather: {weather}, temperature: {Math.round(temp)} &#8451;
            </CardSubtitle>
            <div>   {date.getDate()}/
            {date.getMonth()}/
            {date.getFullYear()}</div>
        </CardBody>
        </Card>
      </Col>
    );
};
export default TempCart;