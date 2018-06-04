import React from 'react';
//import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const GameList = withRouter(({ history }) => (
  <Fade in tag="div" timeout={500}>
    <main role="main" className="inner cover">
      <Col sm={{ size: 10, offset: 2 }}>
        <h1 className="cover-heading">Game List</h1>
      </Col>
    </main>
    <div className="d-flex w-50 h-100 p-3 mx-auto flex-column">
      <Form>
        <FormGroup row>
          <Label for="selectgame" sm={4} style={{ textAlign: "right" }}>Select Your game</Label>
          <Col sm={8}>
            <Input type="select" name="selectgame" id="selectgame" >
              <option>Stocky</option>
              <option>Brilliant Stocker</option>
              <option>Stock Marker</option>
              <option>Stocker</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 12, offset: 2 }}>
            <Button outline color="success" onClick={() => history.push('/password')} size="lg">Login Game</Button>{'  '}
          </Col>
        </FormGroup>
      </Form>
    </div>
  </Fade>
));

// const mapStateToProps = (state) => {
//   console.log('redux state:', state);
//   return {};
// };

export default GameList;
