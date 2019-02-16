import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AtomCanvas from './AtomCanvas'

import '../css/banner.css';

class Banner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container id="banner" fluid>
                <AtomCanvas />
                <Row>
                    <Col>
                        <div className="text text-banner">
                            Vector
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Banner;