import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';

import Section from '../../templates/Section';
import Header from '../../typography/Header';
import Para from '../../typography/Paragraph';

import '../../css/home/page.css';

const settings = {
    height: "350px",
    mode: 'javascript',
    theme: '3024-night'
}

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Section section_row="1">
                    <Col md>
                        <Header size="2">
                            Magnificent
                        </Header> 
                        <Para>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                    </Col>
                    <Col md>
                        <Header size="2">Quite good</Header> 
                        <Para>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                    </Col>
                    <Col md>
                        <Header size="2">Perplexing</Header> 
                        <Para>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                    </Col>
                </Section>
                <Section section_row="2">
                     <Col md={6}>
                        <Header size="1">Wow! So good!</Header>
                        <Para className="color-1">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                     </Col>
                     <Col md={6}>
                        <Codemirror options={settings} />
                     </Col>
                </Section>
            </div>
        );
    }
}

export default Page;
