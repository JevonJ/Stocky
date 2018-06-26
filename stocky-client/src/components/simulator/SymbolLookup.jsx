import React, { Component } from 'react';
import { Card, CardTitle, CardBody } from 'mdbreact';
import { Input } from 'reactstrap';

class SymbolLookup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      selectedStock: null,
    };
  }

  onChange({ target: { name, value } }) {
    const newState = { ...this.state };
    newState[name] = value.replace(/\s/g, '');
    const { stockInfo } = this.props;

    const selectedStock = stockInfo[value.toUpperCase()] || null;

    this.setState({
      ...newState,
      selectedStock,
    });
  }

  render() {
    const { selectedStock } = this.state;
    return (
      <Card style={{ minWidth: '20rem', marginTop: '1rem' }}>
        <CardBody>
          <CardTitle>Symbol Lookup</CardTitle>
          <Input
            name="name"
            placeholder="Enter Symbol"
            value={this.state.name}
            onChange={e => this.onChange(e)}
          />
          {
            selectedStock &&
            <div>
              <div style={{ textAlign: 'center' }}>Company: {selectedStock.stockName}</div><br />
              <div style={{ textAlign: 'center' }}>Sector: {selectedStock.stockSector}</div>
            </div>
          }
        </CardBody>
      </Card>
    );
  }
}

export default SymbolLookup;

