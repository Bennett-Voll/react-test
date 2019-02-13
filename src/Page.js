import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Trigger } from './helpers';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styleHeader = {
            fontSize: '32px',
            fontFamily: 'Arial',
            lineHeight: 1,
            marginBottom: '30px',
        };

        const styleText = {
            fontSize: '15px',
            fontFamily: 'Arial',
            lineHeight: 2,
            maxWidth: '720px',
        };

        return (
            <div id="page" style={{ backgroundColor: '#fff', }}>
                <Container>
                    <Row>
                        <Col>
                            <div style={styleHeader}>
                                React
                            </div> 
                            <div style={styleText}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                            </div>  
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Page;
