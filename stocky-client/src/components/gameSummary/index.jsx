import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-chartkick';
import { Row, Col, Card, CardText, CardTitle,Container } from 'reactstrap';
import { Button } from 'mdbreact';

import 'chart.js';
import PlayerSummaryTable from './PlayerSummaryTable';

class GameSummary extends Component {
  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  render() {
    const chartData = [
      {
        name: 'LFIN',
        data: {
          R1: 122,
          R2: 120,
          R3: 119,
          R4: 110,
          R5: 122,
          R6: 128,
          R7: 100,
          R8: 95,
          R9: 75,
          R10: 100,
          R11: 120,
          R12: 122,
          R13: 122,
          R14: 135,
          R15: 120,
        },
      },
    ];

    const { playerStocks, user, roomInfo, players } = this.props;
    return (
      <Container fluid>
        <Row>
          <h1>XXX Won the Game!!!</h1>
        </Row>
        <Row>
          <LineChart
            data={chartData}
            id="users-chart"
            colors={['#666']}
            xtitle="Round Number"
            ytitle="Price"
            legend="right"
          />
        </Row>
        <Row>
         <PlayerSummaryTable
          toggle={() => this.toggle()}
          players={players}
          playerStocks={playerStocks}
          user={user}
          roomInfo={roomInfo}
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
            <Button outline color="success" size="lg">New Game</Button>
            <Button outline color="danger" size="lg">Quit</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, roomInfo, playerStocks, players }) => ({
  user,
  roomInfo,
  playerStocks,
  players,
});
export default connect(mapStateToProps)(GameSummary);
