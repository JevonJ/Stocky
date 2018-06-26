import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardText, CardTitle, Container } from 'reactstrap';
import { Button } from 'mdbreact';
import StockChart from './StockChart';

import PlayerSummaryTable from './PlayerSummaryTable';

class GameSummary extends Component {
  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  render() {
    const {
      playerStocks, user, roomInfo, roomStocks, stocks, players,
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <h1>XXX Won the Game!!!</h1>
        </Row>
        {roomInfo &&
          <StockChart roomStocks={roomStocks} roomInfo={roomInfo} stocks={stocks} user={user} />
        }
        <Row>
         <PlayerSummaryTable
          toggle={() => this.toggle()}
          players={players}
          playerStocks={playerStocks}
          user={user}
          roomInfo={roomInfo}
          roomStocks={roomStocks}
        />
        </Row>
        <Row>
          <Col>
            <Card body inverse color="info">
              <CardTitle> Summary of the Game </CardTitle>
              <CardText>
                Number of rounds Played :<br />
                Special Events :<br />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button href="/" outline color="success" size="lg">New Game</Button>
            <Button href="/" outline color="danger" size="lg">Quit</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({
  user, roomInfo, playerStocks, stocks, players, roomStocks,
}) => ({
  user,
  roomInfo,
  roomStocks,
  playerStocks,
  players,
  stocks,
});
export default connect(mapStateToProps)(GameSummary);
