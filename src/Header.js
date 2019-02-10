import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Header extends Component {
    render() {
      return (
        <header>
            <Container>
                <Row>
                    <Col>
                        Test
                    </Col>
                    <Col>
                        Test2
                    </Col>
                </Row>
            </Container>
        </header>
      );
    }
  }
  
  export default Header;