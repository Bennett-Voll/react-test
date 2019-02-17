import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Section from '../../templates/Section';

import Header from '../../typography/Header';
import Para from '../../typography/Paragraph';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Section section_row="1">
                    <Col md>
                        <Header className="font-type-2">404</Header>
                        <Para>It seems we don't have what you were looking for.</Para>
                    </Col>
                </Section>
            </div>
        );
    }
}

export default Page;
