import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Section from '../../templates/Section';

// import '../../css/home/page.css';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Section section_row="1">
                    <Col md>
                        404
                    </Col>
                </Section>
            </div>
        );
    }
}

export default Page;
