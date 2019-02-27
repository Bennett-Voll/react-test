import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Text from 'typography/Text';
import AtomCanvas from './AtomCanvas'

import 'css/banner.css';

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
                        <Text className="text-banner">
                            Vector js
                        </Text>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Banner;