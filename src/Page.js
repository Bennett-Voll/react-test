import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Section from './Section';

import './css/page.css';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Section section_row="1">
                    <Col>
                        <div className="header">
                            Magnificent
                        </div> 
                        <div className="text">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </div>
                    </Col>
                    <Col>
                        <div className="header">
                            Quite good
                        </div> 
                        <div className="text">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </div>
                    </Col>
                    <Col>
                        <div className="header">
                            Perplexing
                        </div> 
                        <div className="text">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </div>
                    </Col>
                </Section>
                <Section section_row="2">
                     
                </Section>
            </div>
        );
    }
}

export default Page;
