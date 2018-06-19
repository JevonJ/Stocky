import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge, Button, Card, CardTitle, CardText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, CardBody } from 'reactstrap';
import CountDown from 'react-countdown-clock';

import BuyModal from '../modals/BuyModalMain';
import DashboardHeader from './DashboardHeader';
import PlayerList from './PlayerList';
import LiveFeed from './LiveFeed';
import StockList from './StockList';
import SoldStockList from './SoldStockList';
import PurchasedStockList from './PurchasedStockList';
import RoundNumber from './RoundNumber';

import { setStartTime } from '../../actions';

const styles = {
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(33,33,33 ,0.9)',
    zIndex: 99,
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapse1: false,
      news: [],
      modal: false,
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

  render() {
    const {
      socket, players, playerStocks, stocks, sectors, sectorStocks, stockInfo, liveFeed, roomStocks, user, roomInfo, time, setStartTime,
    } = this.props;
    return (
      <div>
        {(time.start_time > 0) &&
          <div id="Overlay" style={styles.overlay}>
            <div style={{ paddingTop: '18%' }}>
              <Col sm="12" style={{ color: '#8c98a5', fontWeight: 'bold', fontSize: '2em', textAlign: 'center', padding: '1em' }}>
                Game starting in...
              </Col>
              <div style={{ paddingLeft: '45%' }}>
                <CountDown
                  seconds={time.start_time}
                  color="#fff"
                  alpha={0.9}
                  size={100}
                  onComplete={() => setStartTime(0)}
                />
              </div>
            </div>
          </div>
        }
        <Row>
          <BuyModal
            isOpen={this.state.modal}
            toggle={() => this.toggleModal()}
            stock={this.state.selectedStock}
            roomStocks={roomStocks}
            roomInfo={roomStocks}
            socket={socket}
          />

          <Col sm="3">
            <Row>
              <Button outline color="primary" onClick={() => this.toggle('collapse')} style={{ marginBottom: '1rem' }}><h4>Sold Stocks </h4></Button>
            </Row>
            <SoldStockList
              isOpen={this.state.collapse}
              playerStocks={playerStocks}
              user={user}
            />
            <Row>
              <Button outline color="primary" onClick={() => this.toggle('collapse1')} style={{ marginBottom: '1rem' }}><h4>Purchased </h4></Button>
            </Row>
            <PurchasedStockList
              isOpen={this.state.collapse1}
              socket={socket}
              playerStocks={playerStocks}
              roomStocks={roomStocks}
              user={user}
            />
            <Row>
              <Card
                body
                inverse
                style={{
                  backgroundColor: '#333', borderColor: '#333', padding: '0.5rem', alignItems: 'center',
                }}
              >
                <CardTitle>Symbol lookup</CardTitle>
                <CardBody>
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
                </CardBody>
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
                  <RoundNumber roomInfo={roomInfo} user={user}/>
                </div>
              </Col>
              <Col sm="6">
                <p><b>Time is Running!!!</b></p>
                {time.start_time === 0 &&
                  <CountDown
                    seconds={60}
                    color="#000"
                    alpha={0.9}
                    size={100}
                  />
                }
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
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>Engineering sector is having a boom of/... </ListGroupItem>
                      <ListGroupItem>ETI Group is undergoing a scandal...</ListGroupItem>
                    </ListGroup>
                  </CardBody>
                  <Button outline color="secondary">Clear</Button>
                </Card>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  stocks, sectors, sectorStocks, liveFeed, players, playerStocks, stockInfo, roomStocks, user, roomInfo, time,
}) => ({
  players,
  stocks,
  sectors,
  playerStocks,
  sectorStocks,
  roomInfo,
  stockInfo,
  liveFeed,
  roomStocks,
  user,
  time,
});

export default connect(mapStateToProps, { setStartTime })(Dashboard);

