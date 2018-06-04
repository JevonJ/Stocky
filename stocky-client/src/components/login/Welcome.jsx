import React from 'react';
import { Fade, Button } from 'reactstrap';
import { withRouter } from 'react-router';

const Welcome = withRouter(({ history }) => (
 <Fade in tag="div" timeout={300}>
  <main role="main" className="inner cover">
   <h1 className="cover-heading">Welcome to Stocky</h1>
   <p className="lead">Would you like to join or host a game ?</p>
   <p className="lead">
    <Button outline color="primary" size="lg">Join Game</Button>
    <Button outline color="primary" onClick={() => { history.push('/host-game') }} size="lg">Host Game</Button>
   </p>
  </main>
 </Fade>
));

export default Welcome;
