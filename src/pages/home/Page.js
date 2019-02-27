import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Section from 'templates/Section';
import Header from 'typography/Header';
import Para from 'typography/Paragraph';

import CodeEditor from 'templates/CodeEditor';

import 'css/home/page.css';

const code1 = `
const vectors = [];
const start = new Vector(0.05, 0.5);

let prev = start;

for (let i = 0; i < 40; i++) {
  prev = prev.clone().add(
    new Vector(0.02, Math.cos(i / 2) * 0.05)
  );
  
  vectors.push(prev);
}

ctx.beginPath();

vectors.forEach((vector) => {
  vector.scaleX(width);
  vector.scaleY(height);
  
  ctx.lineTo(vector.x, vector.y);
});

ctx.stroke();`;

const code2 = `
const vectors = [];
const start = new Vector(0.05, 0.5);

let prev = start;

for (let i = 0; i < 40; i++) {
  prev = prev.clone().add(
    new Vector(0.02, Math.cos(i / 12.7) * 0.02)
  );
  
  vectors.push(prev);
}


ctx.beginPath();

vectors.forEach((vector) => {
  vector.scaleX(width);
  vector.scaleY(height);
  
  ctx.lineTo(vector.x, vector.y);
});

ctx.stroke();

const eye1 = new Vector(0.2, 0.2);
const eye2 = new Vector(0.7, 0.2);

eye1.scaleX(width);
eye1.scaleY(height);
eye2.scaleX(width);
eye2.scaleY(height);

ctx.drawPoint(eye1.x, eye1.y);
ctx.drawPoint(eye2.x, eye2.y);
`;  

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
                     <Col md={4}>
                        <Header size="1">Wow! So good!</Header>
                        <Para className="color-1">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                     </Col>
                     <Col md={8}>
                        <CodeEditor code={code1} />
                     </Col>
                </Section>
                <Section section_row="3">
                     <Col md={8}>
                        <CodeEditor code={code2} />
                     </Col>
                     <Col md={4}>
                        <Header size="1">I guess that's nice.</Header>
                        <Para className="color-1">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </Para>
                     </Col>
                </Section>
            </div>
        );
    }
}

export default Page;
