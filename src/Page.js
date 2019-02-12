import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animation from './animation';
import Trans from './transitions';

import { Trigger } from './helpers';

class Page extends Component {
    constructor(props) {
        super(props);

        this.animation = Animation.dummy();

        this.state = {
            top: window.innerHeight,
        };

        Trigger.on('introScroll', (pastBoundary) => {
            this.animation.stop();

            const endVal = pastBoundary ? 0 : window.innerHeight;

            this.animation = Animation.animateCallback((val) => {
                this.setState({
                    top: val,
                });
            }, this.state.top, endVal, 500, Trans.easeInOutQuad);
        });
    }

    render() {
        return (
            <Container style={{ position: 'relative', top: this.state.top, paddingTop: 320 }}>
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
