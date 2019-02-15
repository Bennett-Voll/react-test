import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import { Trigger } from '../helpers';

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className: '',
        };

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        Trigger.on('scroll', this.onScroll);
    }

    componentWillUnmount() {
        Trigger.off('scroll', this.onScroll);
    }

    onScroll() {
        const el = ReactDOM.findDOMNode(this);
        const offsets = el.getBoundingClientRect();

        const pastElement = offsets.top + el.offsetHeight < window.innerHeight;
        const inView = this.state.inView;

        if (pastElement && ! inView) {
            this.setState({
                inView: true,
            });
        }
        
        if (! pastElement && inView) {
            this.setState({
                inView: false,
            });
        }
    }

    render() {
        const containerProps = this.props.containerProps || {};
        const rowProps = this.props.rowProps || {};

        const className = this.state.inView ? 'in-view' : '';
    
        return (
            <div className={`section section_row_${this.props.section_row} ${className}`}>
                <Container {...containerProps}>
                    <Row {...rowProps}>
                        {this.props.children}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Section;