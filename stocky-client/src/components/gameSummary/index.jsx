import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardText, CardTitle } from 'reactstrap';
import { Button, Navbar, NavbarBrand, Container, Footer } from 'mdbreact';
import StockChart from './StockChart';

import PlayerSummaryTable from './PlayerSummaryTable';

class GameSummary extends Component {
  static sortPlayers(a, b) {
    const asset1 = a.totalAssets;
    const asset2 = b.totalAssets;

    let comparison = 0;
    if (asset1 > asset2) {
      comparison = 1;
    } else if (asset1 < asset2) {
      comparison = -1;
    }
    return comparison * -1;
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  calculatePurchased(stocks) {
    const { roomStocks } = this.props;

    const sum = stocks.reduce((total, stock) => {
      if (stock.initStockQty === 0) {
        return total;
      }
      const remainingStocks = (stock.initStockQty - stock.soldStockQty.reduce((a, b) => a + b, 0));
      const stockPriceArr = roomStocks[stock.stockSymbol];
      const stockPrice = stockPriceArr[stockPriceArr.length - 1];

      return total + (stockPrice * remainingStocks);
    }, 0);

    return sum;
  }

  calculateAssetsAndSort(players) {
    const { playerStocks } = this.props;

    const newPlayersObj = players.map((player) => {
      const stocks = playerStocks[player.name].purchased;
      const totalAssets = (this.calculatePurchased(stocks) + player.cash);
      return { totalAssets, ...player };
    });

    return newPlayersObj.sort((a, b) => GameSummary.sortPlayers(a, b));
  }

  render() {
    const {
      playerStocks, user, roomInfo, roomStocks, stocks, players,
    } = this.props;
    return (
      <Container fluid>
        <Navbar color="default-color" dark expand="md" scrolling>
          <NavbarBrand href="/">
            <strong>Game Summary</strong>
          </NavbarBrand>
        </Navbar>
        <Row>
          <div style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'center' }} className="animated tada infinite" ><strong>{players.length > 0 && players[0].name}</strong></h1><h1 style={{ textAlign: 'center' }}> Won the Game!!!</h1>
          </div>
        </Row>
        {roomInfo &&
          <StockChart roomStocks={roomStocks} roomInfo={roomInfo} stocks={stocks} user={user} />
        }
        <Row style={{ marginTop: '1rem' }}>
          <Col xs="6">
            <PlayerSummaryTable
              toggle={() => this.toggle()}
              players={this.calculateAssetsAndSort(players)}
              playerStocks={playerStocks}
              user={user}
              roomInfo={roomInfo}
              roomStocks={roomStocks}
            />
          </Col>
          <Col xs="6">
            <Card body inverse color="info">
              <CardTitle> Summary of the Game </CardTitle>
              <CardText>
                Number of rounds Played :{roomInfo[user.room] !== undefined && roomInfo[user.room].rounds}<br />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingLeft: '44%' }}>
          <Button href="https://jevonj.github.io/Stocky/" outline color="success" size="lg">New Game</Button>
        </Row>
        <Footer color="special-color-dark" className="mt-auto page-footer lighten-5 pt-0">
          <div className="footer-copyright text-center">
            <Container fluid>
              <a href="https://github.com/JevonJ/Stocky">A Stock Market Simulator Game </a>
              by <a href="https://github.com/JevonJ/Stocky"> Team Titans.</a>
            </Container>
          </div>
        </Footer>
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
