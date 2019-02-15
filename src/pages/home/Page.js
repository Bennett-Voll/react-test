import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Section from '../../templates/Section';

import '../../css/home/page.css';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Section section_row="1">
                    <Col md>
                        <div className="text header-2">
                            Magnificent
                        </div> 
                        <div className="text text-normal">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </div>
                    </Col>
                    <Col md>
                        <div className="text header-2">
                            Quite good
                        </div> 
                        <div className="text text-normal">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </div>
                    </Col>
                    <Col md>
                        <div className="text header-2">
                            Perplexing
                        </div> 
                        <div className="text text-normal">
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
