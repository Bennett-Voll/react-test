import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './img/logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerIsCollapsed: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                this.setState({
                    headerIsCollapsed: window.scrollY > 10,
                });
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.headerIsCollapsed !== this.state.headerIsCollapsed;
    }

    render() {
        let headerHeight = 100;

        if (this.state.headerIsCollapsed) {
            headerHeight = 50;
        }

        const styleHeader = {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            backgroundColor: '#000',
            height: headerHeight,
            transition: '300ms ease-in-out',
        };

        const styleLogo = {
            height: headerHeight,
            maxWidth: '100%',
            transition: '300ms ease-in-out',
        };

        const styleImg = {
            display: 'block',
            maxHeight: '100%',
        };

        return (
            <header style={{... styleHeader}}>
                <Container>
                    <Row>
                        <Col>
                            <div id="logo" style={{... styleLogo}}>
                                <img style={{... styleImg}} src={logo} alt="logo" />
                            </div>
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center', }}>
                            Test2
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;