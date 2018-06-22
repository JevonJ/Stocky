import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import { Row, Col, Card, CardText, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { Button } from 'mdbreact';
import 'chart.js';

class GameSummary extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
    };
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
    return (
      <Container fluid>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalHeader toggle={() => this.toggle()}><h3>Mark{"'"}s game history</h3></ModalHeader>
          <ModalBody>
            <h4>Bought</h4>
            <Table dark striped>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Round</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>LFIN</td>
                  <td>1</td>
                  <td>LKR.12</td>
                  <td>5</td>
                </tr>
              </tbody>
            </Table>
            <h4>Sold</h4>
            <Table dark striped>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Round</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>LFIN</th>
                  <td>1</td>
                  <td>LKR.11</td>
                  <td>2</td>
                </tr>
              </tbody>
            </Table>
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

export default GameSummary;
