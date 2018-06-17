import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse, Button, Card, Table, CardTitle, CardText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label } from 'reactstrap';
import CountDown from 'react-countdown-clock';

import BuyModal from '../modals/BuyModalMain';
import SellShareModal from '../modals/SellSharesModal';
import DashboardHeader from './DashboardHeader';
import PlayerList from './PlayerList';
import LiveFeed from './LiveFeed';
import StockList from './StockList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapse1: false,
      news: [],
      modal: false,
      sellModal: false,
    };
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/login');
    }
  }

  toggle(type) {
    if (type === 'collapse') this.setState({ collapse: !this.state.collapse });
    if (type === 'collapse1') this.setState({ collapse1: !this.state.collapse1 });
  }

  addTonews() {
    const newArr = this.state.news;
    newArr.push('newsssssss');
    this.setState({
      news: newArr,
    });
  }

  toggleModal(stock) {
    this.setState({
      modal: !this.state.modal,
      selectedStock: stock,
    });
  }

  toggleSellModal(sellStockData) {
    this.setState({
      sellModal: !this.state.sellModal,
      selectedSellStock: sellStockData,
    });
  }


  render() {
    const {
      socket, players, playerStocks, stocks, sectors, sectorStocks, stockInfo, liveFeed, roomStocks, user,
    } = this.props;
    return (
      <Row>
        <BuyModal
          isOpen={this.state.modal}
          toggle={() => this.toggleModal()}
          stock={this.state.selectedStock}
          stockInfo={stockInfo}
          socket={socket}
        />

        <SellShareModal
          isOpen={this.state.sellModal}
          toggle={() => this.toggleSellModal()}
          sellStockData={this.state.selectedSellStock}
        />

        <Col sm="3">
          <Row>
            <Button outline color="primary" onClick={() => this.toggle('collapse')} style={{ marginBottom: '1rem' }}><h4>Sold Stocks </h4></Button>
          </Row>
          <Row>
            <Collapse isOpen={this.state.collapse}>
              <Table striped responsive size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Qty</th>
                    <th>Value</th>
                    <th>Current</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </Collapse>
          </Row>
          <Row>
            <Button outline color="primary" onClick={() => this.toggle('collapse1')} style={{ marginBottom: '1rem' }}><h4>Purchased </h4></Button>
          </Row>
          <Row>
            <Collapse isOpen={this.state.collapse1}>
              <Table striped responsive size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Qty</th>
                    <th>Value</th>
                    <th>Current</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>20</td>
                    <td>15.00</td>
                    <td>18.00</td>
                    <td><Button
                      color="danger"
                      onClick={() => this.toggleSellModal({
                        symbol: 'Mark', oldPrice: 15.00, curPrice: 18.00, avlqty: 20,
                      })}
                    >Sell
                        </Button>{' '}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>15</td>
                    <td>12.00</td>
                    <td>10.00</td>
                    <td><Button
                      color="danger"
                      onClick={() => this.toggleSellModal({
                        symbol: 'Mark', oldPrice: 12.00, curPrice: 10.00, avlqty: 15,
                      })}
                    >Sell
                        </Button>{' '}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>12</td>
                    <td>16.00</td>
                    <td>16.00</td>
                    <td><Button
                      color="danger"
                      onClick={() => this.toggleSellModal({
                        symbol: 'Mark', oldPrice: 16.00, curPrice: 16.00, avlqty: 12,
                      })}
                    >Sell
                        </Button>{' '}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Collapse>
          </Row>
          <Row>
            <Card
              body
              inverse
              style={{
                backgroundColor: '#333', borderColor: '#333', padding: '0.5rem', alignItems: 'center',
              }}
            >
              <CardTitle>Symbol lookup</CardTitle>
              <CardText>
                <ButtonDropdown
                  isOpen={this.state.btnDropright}
                  toggle={() => this.setState({ btnDropright: !this.state.btnDropright })}
                >
                  <DropdownToggle outline caret>
                    Search by
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Company name</DropdownItem>
                    <DropdownItem>Symbol</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Input placeholder="" style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                <Label style={{ textAlign: 'center' }}>Arpico(Pvt)Ltd</Label>
              </CardText>
            </Card>
          </Row>
        </Col>
        <Col sm="6">
          <Container>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroupItem
                    className="justify-content-between"
                    color="danger"
                  >
                    <h4>Cash Remaining</h4><h5><Badge pill>LKR 1,000</Badge></h5>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem
                    className="justify-content-between"
                    color="warning"
                  >
                    <h4>Stock Value</h4><h5><Badge pill>LKR 6,560.65</Badge></h5>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem
                    className="justify-content-between"
                    color="info"
                  >
                    <h4>Total Asset Value</h4><h5><Badge pill>LKR 13,660.65</Badge></h5>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <h2>Currently in Market {'>>>'}</h2>
            </Row>
            <Row>
              {Object.keys(user).length !== 0 &&
                <StockList
                  sectors={sectors}
                  sectorStocks={sectorStocks}
                  stocks={stocks}
                  stockInfo={stockInfo}
                  roomStocks={roomStocks}
                  toggleModal={stock => this.toggleModal(stock)}
                />
              }
            </Row>
          </Container>
        </Col>
        <Col sm="3">
          <Row>
            <Col sm="6">
              <div align="center">
                <Card body inverse color="danger" className="text-center">
                  <CardTitle><h3>Round Number</h3></CardTitle>
                  <CardText><h3>2</h3></CardText>
                </Card>
              </div>
            </Col>
            <Col sm="6">
              <p><b>Time is Running!!!</b></p>
              <CountDown
                seconds={60}
                color="#000"
                alpha={0.9}
                size={100}
              />
            </Col>
          </Row>
          <Row>
            <PlayerList players={players} playerStocks={playerStocks} />
          </Row>
          <Row>
            <LiveFeed liveFeed={liveFeed} />
          </Row>
          <Row>
            <div>
              <Card body outline color="warning">
                <CardTitle>Current Events</CardTitle>
                <CardText>
                  <ListGroup>
                    <ListGroupItem>Engineering sector is having a boom of/... </ListGroupItem>
                    <ListGroupItem>ETI Group is undergoing a scandal...</ListGroupItem>
                  </ListGroup>
                </CardText>
                <Button outline color="secondary">Clear</Button>
              </Card>
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

<<<<<<< HEAD
const mapStateToProps = ({ players, stocks, sectors, sectorStocks }) => {
  return {
    players,
    stocks,
    sectors,
    sectorStocks,
  };
};
=======
const mapStateToProps = ({
  stocks, sectors, sectorStocks, liveFeed, players, playerStocks, stockInfo, roomStocks, user
}) => ({
  players,
  stocks,
  sectors,
  playerStocks,
  sectorStocks,
  stockInfo,
  liveFeed,
  roomStocks,
  user,
});
>>>>>>> 8a157bf9621a1128be152a697b94fdd6b403bd82

export default connect(mapStateToProps)(Dashboard);

