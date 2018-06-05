import React from 'react';
// import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const Popuppassword = withRouter(({ history }) => (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner cover">
        <Col sm={{ size: 10, offset: 2 }}>
          <h1 className="cover-heading">Login To Your Game</h1>
          </Col>
        </main>
        <div className="d-flex w-50 h-100 p-3 mx-auto flex-column">
          <Form>

             <FormGroup row>
              <Label for="username" sm={4} style={{ textAlign: "right" }}>Username</Label>
              <Col sm={8}>
                <Input type="text" name="username" id="username"></Input>
              </Col>
            </FormGroup>
          <FormGroup row>
              <Label for="password" sm={4} style={{ textAlign: "right" }}>Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="password"></Input>
              </Col>
            </FormGroup>
           
            <FormGroup check row>
            <p className="lead">
                <Button outline color="success" size="lg">Start Game</Button>{''}
                <Button outline color="secondary" size="lg">Cancel</Button>
              </p>
            </FormGroup>
          </Form>
        </div>
      </Fade>
));
// const mapStateToProps = (state) => {
//   console.log('redux state:', state);
//   return {};
// };
export default Popuppassword;


