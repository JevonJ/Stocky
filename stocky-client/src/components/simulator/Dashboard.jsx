import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge, Collapse, Button, Card, Table, CardTitle, CardText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label } from 'reactstrap';
import CountDown from 'react-countdown-clock';

import BuyModal from '../modals/BuyModalMain';
import SellShareModal from '../modals/SellSharesModal';
import DashboardHeader from './DashboardHeader';

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

  toggleModal(stockData) {
    this.setState({
      modal: !this.state.modal,
      selectedStock: stockData,
    });
  }

  toggleSellModal(sellStockData) {
    this.setState({
      sellModal: !this.state.sellModal,
      selectedSellStock: sellStockData,
    });
  }


  render() {
    return (
      <Row>
        <BuyModal
          isOpen={this.state.modal}
          toggle={() => this.toggleModal()}
          stockData={this.state.selectedStock}
          socket={this.props.socket}
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
                    <td><Button color="danger" onClick= {() => this.toggleSellModal({symbol: 'Mark', oldPrice: 15.00, curPrice: 18.00, avlqty: 20})}>Sell</Button>{' '}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>15</td>
                    <td>12.00</td>
                    <td>10.00</td>
                    <td><Button color="danger" onClick= {() => this.toggleSellModal({symbol: 'Mark', oldPrice: 12.00, curPrice: 10.00, avlqty: 15})}>Sell</Button>{' '}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>12</td>
                    <td>16.00</td>
                    <td>16.00</td>
                    <td><Button color="danger" onClick= {() => this.toggleSellModal({symbol: 'Mark', oldPrice: 16.00, curPrice: 16.00, avlqty: 12})}>Sell</Button>{' '}</td>
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
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Company name</th>
                      <th>Symbol</th>
                      <th>Sector</th>
                      <th>Last</th>
                      <th>Current</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Singer pvt.Ltd</td>
                      <td>SPL</td>
                      <td>Financial</td>
                      <td>Rs.15.00</td>
                      <td>Rs.18.00</td>
                      <td><Button color="success" onClick={() =>this.toggleModal({symbol: 'SPL', uPrice:'18.00'})}>Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>AIB group</td>
                      <td>AIB</td>
                      <td>Financial</td>
                      <td>Rs.13.00</td>
                      <td>Rs.12.00</td>
                      <td><Button color="success" onClick={() =>this.toggleModal({symbol: 'AIB', uPrice:'12.00'})}>Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Felix pvt.Ltd</td>
                      <td>FVL</td>
                      <td>Health Care</td>
                      <td>Rs.10.00</td>
                      <td>Rs.15.00</td>
                      <td><Button color="success" onClick={() =>this.toggleModal({symbol: 'FLV', uPrice:'15.00'})}>Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Abans pvt.Ltd</td>
                      <td>APL</td>
                      <td>Technologies</td>
                      <td>Rs.17.00</td>
                      <td>Rs.13.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Holmes pvt.Ltd</td>
                      <td>HPL</td>
                      <td>Engineering</td>
                      <td>Rs.15.00</td>
                      <td>Rs.15.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Morningstar pvt.Ltd</td>
                      <td>MPL</td>
                      <td>Financial</td>
                      <td>Rs.20.00</td>
                      <td>Rs.18.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Chandra Group</td>
                      <td>CHG</td>
                      <td>Consumer Service</td>
                      <td>Rs.22.00</td>
                      <td>Rs.20.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Singhe Hospitals pvt.Ltd</td>
                      <td>SHP</td>
                      <td>Healthcare</td>
                      <td>Rs.25.59</td>
                      <td>Rs.52.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>Chello Diary Products</td>
                      <td>CDP</td>
                      <td>Consumer Service</td>
                      <td>Rs.20.50</td>
                      <td>Rs.45.00</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,009</td>
                      <td>augue</td>
                      <td>semper</td>
                      <td>porta</td>
                      <td>Mauris</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,010</td>
                      <td>massa</td>
                      <td>Vestibulum</td>
                      <td>lacinia</td>
                      <td>arcu</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,011</td>
                      <td>eget</td>
                      <td>nulla</td>
                      <td>Class</td>
                      <td>aptent</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,012</td>
                      <td>taciti</td>
                      <td>sociosqu</td>
                      <td>ad</td>
                      <td>litora</td>
                      <td><Button color="success">Buy</Button>{' '}</td> 
                    </tr>
                    <tr>
                      <td>1,013</td>
                      <td>torquent</td>
                      <td>per</td>
                      <td>conubia</td>
                      <td>nostra</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,014</td>
                      <td>per</td>
                      <td>inceptos</td>
                      <td>himenaeos</td>
                      <td>Curabitur</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                    <tr>
                      <td>1,015</td>
                      <td>sodales</td>
                      <td>ligula</td>
                      <td>in</td>
                      <td>libero</td>
                      <td><Button color="success">Buy</Button>{' '}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
            <Card body outline color="danger">
              <CardTitle><h5>Room name: Team Titans</h5></CardTitle>
              <CardText>
                <Table borderless>
                  <thead>
                    <tr>
                      <th>Rank </th>
                      <th>Name</th>
                      <th>Assets</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Jevon</td>
                      <td>LKR 77,660.65</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Ashen</td>
                      <td>LKR 63,687.11</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Inuri</td>
                      <td>LKR 50,984.99</td>
                    </tr>
                  </tbody>
                </Table>
              </CardText>
            </Card>
          </Row>
          <Row>
            <div>
              <Card body outline color="primary">
                <CardTitle>Live feed</CardTitle>
                {
                  this.state.news.map(newselement => <CardText>{newselement}</CardText>)
                }
                <Button onClick={() => this.addTonews()} outline color="secondary">Clear</Button>
              </Card>
            </div>
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

export default Dashboard;
