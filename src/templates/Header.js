import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../img/logo.svg';

import { Link } from 'react-router-dom';

import { Trigger } from '../helpers';  

import '..//css/header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerIsCollapsed: false,
        };

        Trigger.on('introScroll', (pastBoundary) => {
            this.setState({
                headerIsCollapsed: pastBoundary,
            });
        });
    }

    render() {
        let headerHeight = 80;
        let className = '';

        if (this.state.headerIsCollapsed) {
            headerHeight = 40;
            className = 'intro';
        }

        const navItems = [
            {
                text: 'Home',
                to: '/'
            },
            {
                text: 'About',
                to: '/about',
            },
            {
                text: 'Contact',
                to: '/contact',
            },
        ];

        const styleHeader = {
            height: headerHeight,
        };


        const styleImg = {
            height: headerHeight,
        };

        return (
            <header className={className} style={{... styleHeader}}>
                <Container>
                    <Row>
                        <Col>
                            <div id="logo">
                                <img style={{... styleImg}} src={logo} alt="logo" />
                            </div>
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end', }}>
                            <div className="main-nav">
                                {
                                    navItems
                                        .map(t => <Link {...t} className="nav-item">{t.text}</Link>)
                                        .reduce((prev, curr) => [prev, curr])
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;