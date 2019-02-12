import React, { Component } from 'react';
import Vector from './vector';
import { map } from './helpers';
import Trans from './transitions';
import Animation from './animation';

import { Trigger } from './helpers';    

/**
 * @todo Refactor code
 */
class AtomCanvas extends Component {
    constructor(props) {
        super(props);

        this.animation = Animation.dummy();
        
        Trigger.on('introScroll', (pastBoundary) => {
            this.animation.stop();

            if (pastBoundary) {
                this.animation = Animation.animate(
                    this.animatable,
                    ['atomFreq', 'opacity', 'size'],
                    [600, 0.3, 0.5],
                    [500, 200, 200],
                    Trans.easeInOutQuad,
                    [0, 200, 0],
                );
            } else {
                this.animation = Animation.animate(
                    this.animatable,
                    ['atomFreq', 'opacity', 'size'],
                    [120, 1, 1],
                    [200, 500, 500],
                    Trans.easeInOutQuad,
                    [300, 0, 0],
                );
            }
        });

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.setState({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            });
        });

        const vCenter = new Vector(255 / 2, 255 / 2);

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

        this.circles = [
            {
                position: vCenter.clone(),
                radius: 20,
            }
        ];

        this.animatable = {
            atomFreq: 120,
            opacity: 1,
            size: 1,
            offsetX: 0,
        };

        this.time = 0;
        this.scrollY = 0;
        this.prevScrollY = null;

        this.atomDisplacement = 0;

        requestAnimationFrame(this.updateCanvas);
    }

    shouldComponentUpdate(newProps, newState) {
        return this.state.width !== newState.width && this.state.height !== newState.height;
    }

    updateCanvas() {
        const ctx = this.ctx;
        const time = this.time;
        const width = this.state.width;
        const height = this.state.height;
        const size = Math.min(width, height) * this.animatable.size;

        const atomDisplacement = this.atomDisplacement;
        this.atomDisplacement += map(1, 0, this.animatable.atomFreq, 0, Math.PI * 2)

        ctx.globalAlpha = this.animatable.opacity;

        const vectOffset = new Vector(this.animatable.offsetX, 0);

        const ellipses = this.ellipses;
        const circles = this.circles;

        const iterations = 100;

        ctx.clearRect(0, 0, width, height);
        ctx.lineJoin = 'miter';
        ctx.lineWidth = '10';
        ctx.lineCap = 'butt';

        ellipses.forEach((ellipse) => {
            const position = ellipse.position;
            const radiusX = ellipse.radiusX;
            const radiusY = ellipse.radiusY;
            const rotation = ellipse.rotation;
            
            const absPosition = position.clone().scale(1 / 255);
            
            absPosition.add(vectOffset);
            absPosition.x *= width;
            absPosition.y *= height;

            let vectPrev = null;

            for (let i = 0; i < iterations; i += 1) {                
                const offset = Math.PI * 2 / iterations * i + atomDisplacement;
                const point = new Vector(radiusX * Math.cos(offset), radiusY * Math.sin(offset));

                const vect = Vector.add(
                    absPosition,
                    point.scale(size / 255).setDirection(point.direction() + rotation),
                );

                ctx.beginPath();

                if (vectPrev) {
                    ctx.moveTo(Math.round(vectPrev.x), Math.round(vectPrev.y));
                    ctx.lineTo(Math.round(vect.x), Math.round(vect.y));
                } else {
                    ctx.moveTo(Math.round(vect.x), Math.round(vect.y));
                }

                const rgb = [
                    255 - (255 - 97) / iterations * i,
                    255 - (255 - 217) / iterations * i,
                    255 - (255 - 250) / iterations * i,
                ];

                ctx.strokeStyle = `rgb(${rgb.join(',')})`;

                ctx.stroke();
                ctx.closePath();
                
                vectPrev = vect;
            }
        });

        circles.forEach((circle) => {
            const circlePosition = circle.position;
            const circleRadius = circle.radius;

            const absPosition = circlePosition.clone().scale(1 / 255);

            absPosition.add(vectOffset);
            absPosition.x *= width;
            absPosition.y *= height;

            ctx.arc(absPosition.x, absPosition.y, circleRadius / 255 * size, 0, Math.PI * 2);
            
            const rgb = [
                97,
                217,
                250,
            ];

            ctx.fillStyle = `rgb(${rgb.join(',')})`;
            ctx.fill();
        });

        this.time += 1;

        requestAnimationFrame(this.updateCanvas);
    }

    render() {
        const styleCanvas = {
            display: 'block',
            position: 'fixed',
            zIndex: '-1',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
        };

        return (
            <canvas
                id="atom-canvas"
                className="canvas"
                style={{... styleCanvas}}
                width={this.state.width} 
                height={this.state.height}
                ref={(c) => this.ctx = c.getContext('2d')}
            />
        );
    }
}

export default AtomCanvas;