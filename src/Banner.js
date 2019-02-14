import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './img/logo.svg';

import './css/banner.css';

class Banner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container id="banner" fluid>
                <Row>
                    <Col>
                        <div className="text text-banner">
                            React
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Banner;