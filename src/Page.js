import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Container>
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
