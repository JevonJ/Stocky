import React, { Component } from 'react';
import { Card, CardTitle, CardBody, Input, Label } from 'reactstrap';

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
        const {stockInfo} = this.props;

        const selectedStock = stockInfo[value.toUpperCase()] || null;

        this.setState({
            ...newState,
            selectedStock,
        });
    }

    render() {
        const { selectedStock } = this.state;
        return (
            <Card body outline color="primary">
                <CardTitle style={{ textAlign: 'center' }}>Symbol lookup</CardTitle>
                <CardBody>
                    <Input
                        name="name"
                        placeholder="Enter Symbol"
                        value={this.state.name}
                        onChange={e => this.onChange(e)}
                    />
                    <br />
                    {
                        selectedStock &&
                        <div>
                            <Label style={{ textAlign: 'center' }}>Company: {selectedStock.stockName}</Label>
                            <Label style={{ textAlign: 'center' }}>Sector: {selectedStock.stockSector}</Label>
                        </div>
                    }
                </CardBody>
            </Card>
        );
    }
}

export default SymbolLookup;

