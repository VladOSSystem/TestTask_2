import React, { 
  useEffect, 
  useState,
 } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  Container,
  Row, 
  Col, 
  Card, 
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
 } from "reactstrap";
import { fetchWeatherAction } from './store/weather/actions';
import Chart from './components/Chart';
import TempCart from './components/TempCart';
import './App.css';
import Loader from './components/Loader';
import Filter from './utils/Filter';
// import Loader from './components/Loader';

const App = ({
  fetch,
  Weather: { fetchSuccess, fetchWeather },
}) => {
  const [q, setQ] = useState('');
  const [unix, setUnix] = useState();
  const [response, setResponse] = useState();
  const checkWeather = () => {
        fetch({ q, unix });
  };
  const onChange = (event) => {
    setQ(event.target.value);
  };
  useEffect(() => {
    const ts = Math.round((new Date()).getTime() / 1000);
    setUnix(ts);
  }, []);
  useEffect(() => {
    if (fetchSuccess) { 
      const res = Filter(fetchWeather);
      setResponse(res);
    }
  }, [fetchWeather]);
  return ( 
    
    <div className="main-background">
      <Container>
        <Row >
          <Col sm={12} className="mb-3">
            <Card>
                <CardBody>
                  <InputGroup className="mb-3">
                    <Input 
                      placeholder="Check yours city weather"
                      value={q}
                      onChange={onChange}
                      />
                    <InputGroupAddon addonType="prepend"><Button onClick={checkWeather}>Search</Button></InputGroupAddon>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>
            {fetchSuccess === null ? null : (
              <>
                {fetchSuccess && response !== undefined ? (
                  <>
                  <Col sm={12} className="mb-3 chart">
                    <Chart weather={response}/>
                  </Col>
                    {response.map((v, k) => (
                      <TempCart key={k} weather={v}/>
                    ))}
                  </>
                ) : (
                  <Col sm={12} className="mb-3 loader">
                    <Loader/>
                  </Col>

                )}
            </>
            )}

          </Row>
        </Container>
    </div>
   
  );
};
App.propTypes = {
  fetch: PropTypes.func,
};
const mapStateToProps = (state) => ({
    Weather: state.Weather,
});
export default connect(mapStateToProps, { fetch: fetchWeatherAction })(App);
