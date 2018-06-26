import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ButtonGroup, Button } from 'reactstrap';
import CountDown from 'react-countdown-clock';
import ReactLoading from 'react-loading';

import BuyModal from '../modals/BuyModalMain';
import DashboardHeaderData from './DashboarHeaderData';
import PlayerList from './PlayerList';
import LiveFeed from './LiveFeed';
import StockList from './StockList';
import SoldStockList from './SoldStockList';
import PurchasedStockList from './PurchasedStockList';
import RoundNumber from './RoundNumber';
import CurrentEvets from './CurrentEvents';
import SymbolLookup from './SymbolLookup';

import { setTime } from '../../actions';

const styles = {
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(33,33,33 ,0.9)',
    zIndex: 99,
    paddingTop: '35vh',
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

  toggleSellModal() {
    this.setState({
      sellModal: !this.state.sellModal,
    });
  }

  sortBySector() {
    this.setState({

    });
  }

  calculateStocks() {
    const { user, socket, roomInfo } = this.props;

    this.setState({
      sellModal: false,
      modal: false,
    });

    this.props.setTime({ round_time: 0 });
   
  

    if (roomInfo[user.room].currentRound + 1 ===  parseInt(roomInfo[user.room].rounds)){
      this.props.socket.emit('go_to_game_summary', user.room);
      return;
    }
    if (user.host) {
      setTimeout(() => {
        socket.emit('calculate_stocks', user.room);
      }, 8000);
    }
  }

  render() {
    const {
      socket, players, playerStocks, stocks, sectors, sectorStocks, stockInfo, liveFeed, roomStocks, user, roomInfo, time, events,
    } = this.props;
    return (
      <Row>
        {
          (time.start_time > 0) &&
          <div id="Overlay" style={styles.overlay}>
            <Col
              sm="12"
              style={{
                color: '#8c98a5', fontWeight: 'bold', fontSize: '2em', textAlign: 'center', padding: '1em',
              }}
            >
              Game starting in...
            </Col>
            <div style={{ paddingLeft: '45%' }}>
              <CountDown
                seconds={time.start_time}
                color="#fff"
                alpha={0.9}
                size={100}
                onComplete={() => { this.props.setTime({ start_time: 0 }); socket.emit('start_game', user.room); }}
              />
            </div>
          </div>
        }

        {time.round_time === 0 && time.start_time === 0 &&
          <div id="Overlay" style={styles.overlay}>
            <Col
              sm="12"
              style={{
                color: '#8c98a5', fontWeight: 'bold', fontSize: '2em', textAlign: 'center',
              }}
            >
              Loading next round.
            </Col>
            <div style={{ paddingLeft: '46%' }}>
              <ReactLoading type="bars" color="#fff" width={100} height={100} />
            </div>
          </div>
        }

        <BuyModal
          isOpen={this.state.modal}
          toggle={() => this.toggleModal()}
          stock={this.state.selectedStock}
          roomStocks={roomStocks}
          roomInfo={roomInfo}
          socket={socket}
          user={user}
          playerStocks={playerStocks}
        />

        <Col xs="3">
          <Container>
            <Row>
              <Button className="align-middle" size="sm" outline color="primary" onClick={() => this.toggle('collapse')} style={{ marginBottom: '1rem' }}><h4>Sold Stocks </h4></Button>
            </Row>
            <SoldStockList
              className="align-middle"
              isOpen={this.state.collapse}
              playerStocks={playerStocks}
              user={user}
            />
            <Row>
              <Button className="align-middle" size="sm" outline color="primary" onClick={() => this.toggle('collapse1')} style={{ marginBottom: '1rem' }}><h4>Purchased </h4></Button>
            </Row>
            <PurchasedStockList
              className="align-middle"
              isOpen={this.state.collapse1}
              socket={socket}
              playerStocks={playerStocks}
              roomStocks={roomStocks}
              user={user}
              roomInfo={roomInfo}
              toggleSellModal={() => this.toggleSellModal()}
              sellModalState={this.state.sellModal}
            />
          <Row>
            <SymbolLookup
              stockInfo={stockInfo}
            />
          </Row>
          </Container>
        </Col>
        <Col xs="6">
          <DashboardHeaderData user={user} playerStocks={playerStocks} roomStocks={roomStocks} />
          <Row>
          <Card>
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
          </Card>
          </Row>
        </Col>
        <Col xs="3">
        <Container>
          <Row>
            <Col sm="6">
              <Row>
                {roomInfo[user.room] && <RoundNumber roomInfo={roomInfo} user={user} />}
              </Row>
            </Col>
            <Col sm="6">
              <Row>
                <p><b>Time is Running!!!</b></p>
              </Row>
              <Row>
                {time.round_time && time.round_time > 0 &&
                  <CountDown
                    seconds={time.round_time}
                    color="#000"
                    alpha={0.9}
                    size={100}
                    onComplete={() => this.calculateStocks()}
                  />
                }
              </Row>
            </Col>
          </Row>
          <Row>
            <PlayerList players={players} playerStocks={playerStocks} roomStocks={roomStocks} />
          </Row>
          <Row>
            <LiveFeed liveFeed={liveFeed} />
          </Row>
          <CurrentEvets events={events} />
          </Container>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({
  stocks, sectors, sectorStocks, liveFeed, players, playerStocks, stockInfo, roomStocks, user, roomInfo, time, events,
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
  events,
});

export default connect(mapStateToProps, { setTime })(Dashboard);

