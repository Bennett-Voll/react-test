import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Section from 'templates/Section';
import Header from 'typography/Header';
import Logo from 'img/Logo';

import 'css/footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <Section>
                    <Col>
                        <div id="logo">
                            <Logo />
                        </div>
                    </Col>
                    <Col>
                        <Header size="2" className="color-5">Footer header</Header>
                    </Col>  
                </Section>
            </footer>
        );
    }
}

export default Footer;