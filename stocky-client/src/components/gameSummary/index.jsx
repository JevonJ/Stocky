import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-chartkick';
import { Row, Col, Card, CardText, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { Button } from 'mdbreact';
import PurchaseSummary from '../gameSummary/PurchaseSummary';
import SoldSummary from '../gameSummary/SoldSummary';

import 'chart.js';

class GameSummary extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
    };
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  toggle() {

    this.setState({
      modal: !this.state.modal,
    });
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

    const { playerStocks, user, roomInfo } = this.props;
    return (
      <Container fluid>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalHeader toggle={() => this.toggle()}>Mark{"'"}s game history</ModalHeader>
          <ModalBody >
            <h4>Bought</h4>
            <PurchaseSummary playerStocks={playerStocks} user={user} roomInfo={roomInfo} />
            <h4>Sold</h4>
           <SoldSummary  playerStocks={playerStocks} user={user} roomInfo={roomInfo}/>
          </ModalBody>
          <ModalFooter>
            <Button outline color="blue-grey" onClick={() => this.toggle()}>Exit</Button>{' '}
          </ModalFooter>
        </Modal>
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
          <Table dark striped responsive>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Assets</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>LKR.76,000</td>
                <td>
                  <Button outline color="info" onClick={() => this.toggle()}>More</Button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>LKR.36,000</td>
                <td><Button outline color="info">More</Button></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>LKR.26,000</td>
                <td><Button outline color="info">More</Button></td>
              </tr>
            </tbody>
          </Table>
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

const mapStateToProps = ({ user, roomInfo, playerStocks }) => ({
  user,
  roomInfo,
  playerStocks,
});
export default connect(mapStateToProps)(GameSummary);
