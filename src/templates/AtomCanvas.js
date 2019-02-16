import React, { Component } from 'react';

import { map, Trigger, cap, Vector } from '../helpers';

/**
 * @todo Refactor code
 */
class AtomCanvas extends Component {
    constructor(props) {
        super(props);
        
        // relative centerpoint for both the ellipses as the cricle
        const vCenter = new Vector(255 / 2, 255 / 2);

        // define properties of the ellipses
        this.ellipses =  [
            {
                rotation: Vector.toRad(30),
                position: vCenter.clone(),
                radiusX: 30,
                radiusY: 255 / 2,
            },
            {
                rotation: Vector.toRad(120 + 30),
                position: vCenter.clone(),
                radiusX: 30,
                radiusY: 255 / 2,
            },
            {
                rotation: Vector.toRad(240 + 30),
                position: vCenter.clone(),
                radiusX: 30,
                radiusY: 255 / 2,
            },
        ];

        // define properties of the circles
        this.circles = [
            {
                position: vCenter.clone(),
                radius: 20,
            }
        ];

        this.updateCanvas = this.updateCanvas.bind(this);
        this.calculateAnimatable = this.calculateAnimatable.bind(this);

        Trigger.on('scroll', this.calculateAnimatable);
        Trigger.on('windowResize', this.calculateAnimatable);

        this.calculateAnimatable();

        Trigger.on('windowResize', (dimensions) => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    componentDidMount() {
        this.atomDisplacement = 0;

        Trigger.on('frame', this.updateCanvas);
    }

    componentWillUnmount() {
        Trigger.off('frame', this.updateCanvas);
    }

    calculateAnimatable() {
        const scrollY = window.scrollY;
        const height = window.innerHeight;

        this.animatable = {
            atomFreq: cap(map(scrollY, 0, height, 160, 800), 160, 800),
            opacity: cap(map(scrollY, 0, height, 1, 0.3), 0.3, 1),
            size: cap(map(scrollY, 0, height, 1, 0.3), 0.3, 1),
            offsetY: cap(map(scrollY, 0, height, 0, 255 / 2), 0, 255 / 2),
        };
    }

    updateCanvas() {
        const ctx = this.ctx;
        const width = this.state.width;
        const height = this.state.height;
        const size = Math.min(width, height) * this.animatable.size;

        const atomDisplacement = this.atomDisplacement + Math.PI;
        this.atomDisplacement += map(1, 0, this.animatable.atomFreq, 0, Math.PI * 2);

        ctx.globalAlpha = this.animatable.opacity;

        const vectOffset = new Vector(0, this.animatable.offsetY);

        const ellipses = this.ellipses;
        const circles = this.circles;

        const length = 60;
        const segmentLength = 6;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = Math.round(5 / 255 * size);
        ctx.strokeStyle = '#AA4465';
        ctx.fillStyle = '#AA4465';

        // draw ellipses
        ellipses.forEach((ellipse) => {
            const position = ellipse.position;
            const radiusX = ellipse.radiusX;
            const radiusY = ellipse.radiusY;
            const rotation = ellipse.rotation;
            
            const absPosition = position.clone();
            
            absPosition.add(vectOffset);
            absPosition.scale(1 / 255);
            absPosition.x *= width;
            absPosition.y *= height;

            let vectPrev = null;

            ctx.beginPath();
            
            for (let i = -segmentLength / 2; i < segmentLength / 2; i += 1) {                
                const offset = Math.PI * 2 / length * i + atomDisplacement;
                const point = new Vector(radiusX * Math.cos(offset), radiusY * Math.sin(offset));

                const vect = absPosition.clone().add(
                    point.scale(size / 255).setDirection(point.direction() + rotation),
                );
                

                if (vectPrev) {
                    ctx.lineTo(Math.round(vect.x), Math.round(vect.y));
                } else {
                    ctx.moveTo(Math.round(vect.x), Math.round(vect.y));
                }
                
                vectPrev = vect;
            }

            ctx.stroke();
        });

        // drawing circles
        circles.forEach((circle) => {
            const position = circle.position;
            const radius = circle.radius;

            const absPosition = position.clone();
            
            absPosition.add(vectOffset);
            absPosition.scale(1 / 255);
            absPosition.x *= width;
            absPosition.y *= height;

            ctx.beginPath();

            ctx.arc(absPosition.x, absPosition.y, radius / 255 * size, 0, Math.PI * 2);

            ctx.fill();
        });
    }

    render() {
        const styleCanvas = {
            display: 'block',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
        };

        return (
            <canvas
                id="atom-canvas"
                className="canvas"
                style={{... styleCanvas}}
                width={this.state.width} 
                height={this.state.height}
                ref={(c) => {
                    if (c) this.ctx = c.getContext('2d');
                }}
            />
        );
    }
}

export default AtomCanvas;