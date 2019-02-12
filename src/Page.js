import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Trigger } from './helpers';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: window.innerHeight,
        };

        Trigger.on('windowResize', (size) => {
            this.setState({
                windowHeight: size.height,
            });
        })
    }

    render() {
        return (
            <Container style={{ marginTop: this.state.windowHeight, }}>
                <Row>
                    <Col>
                        test
                   </Col>
                </Row>
            </Container>
        );
    }
}

export default Page;
