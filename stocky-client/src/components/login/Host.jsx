import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, Col, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

class Host extends Component {

    constructor() {
        super();
        this.state = {
            popoverOpen: false
        };
    }

    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
        });
    }

    render() {

        return (
            <Fade in tag="div" timeout={500}>
                <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
                    {/*<header className="masthead mb-auto"></header>*/}
                    <main role="main" className="inner cover">
                        <h1 className="cover-heading">Signup</h1>                        
                    </main>
                    <div className="d-flex w-50 h-100 p-3 mx-auto flex-column">
                        <Form>
                            <FormGroup row>
                                <Label for="lobbyName" sm={4} style={{ textAlign: "right" }}>Lobby Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="lobbyName" id="lobbyName"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={4} style={{ textAlign: "right" }}>Username</Label>
                                <Col sm={8}>
                                    <Input type="text" name="username" id="username"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="private" sm={4} style={{ textAlign: "right" }}>Private</Label>
                                <Col sm={2}>
                                    <Input type="checkbox" name="private" id="private"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={4} style={{ textAlign: "right" }}>Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="password" id="password"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button outline color="success" size="lg">Create</Button>{'  '}
                                    <Button outline color="secondary" size="lg">Cancel</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <footer className="mastfoot mt-auto">
                        <div className="inner">
                            <p>
                                <a href="https://github.com/JevonJ/Stocky">A Stock Simulator Game</a>, by
                <a href="#" id="Popover1" onClick={() => this.togglePopover()}> Team Titans.</a>
                                <Popover
                                    placement="top"
                                    isOpen={this.state.popoverOpen}
                                    target="Popover1"
                                    toggle={() => this.togglePopover()}
                                >
                                    <PopoverHeader>Our Team</PopoverHeader>
                                    <PopoverBody>
                                        <ul>
                                            <li>Jevon Jansz - 15208469</li>
                                            <li>A.L. Alvis - 15208464</li>
                                            <li>I.J.Ginige - 15209285</li>
                                            <li>D.K.D.S.B.Gunawardhane - 16211242</li>
                                            <li>S.Tharaniya - 15209302</li>
                                            <li>N.G.Wickramadivakara - 15209308</li>
                                        </ul>
                                    </PopoverBody>
                                </Popover>
                            </p>
                        </div>
                    </footer>
                </div>                
            </Fade>
           
            )
    }
}

const mapStateToProps = (state) => {
    console.log('redux state:', state);
};

export default connect(mapStateToProps)(Host);
