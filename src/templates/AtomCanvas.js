import React, { Component } from 'react';

import { map, Trigger, Animation, Trans, Vector } from '../helpers';    

/**
 * @todo Refactor code
 */
class AtomCanvas extends Component {
    constructor(props) {
        super(props);

        this.animation = Animation.dummy();
        
        // intro animations
        Trigger.on('introScroll', (pastBoundary) => {
            this.animation.stop();

            if (pastBoundary) {
                this.animation = Animation.animate(
                    this.animatable,
                    ['atomFreq', 'opacity', 'size'],
                    [800, 0.3, 0.5],
                    [500, 200, 200],
                    Trans.easeInOutQuad,
                    [0, 200, 0],
                );
            } else {
                this.animation = Animation.animate(
                    this.animatable,
                    ['atomFreq', 'opacity', 'size'],
                    [120, 1, 0.9],
                    [200, 500, 200],
                    Trans.easeInOutQuad,
                    [300, 0, 0],
                );
            }
        });

        Trigger.on('windowResize', (dimensions) => {
            this.width = dimensions.width;
            this.height = dimensions.height;
        });

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
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

        this.animatable = {
            atomFreq: 120,
            opacity: 1,
            size: 0.9,
            offsetY: -10,
        };

        this.atomDisplacement = 0;

        requestAnimationFrame(this.updateCanvas);
    }

    updateCanvas() {
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;
        const size = Math.min(width, height) * this.animatable.size;

        const atomDisplacement = this.atomDisplacement;
        this.atomDisplacement += map(1, 0, this.animatable.atomFreq, 0, Math.PI * 2)

        ctx.globalAlpha = this.animatable.opacity;

        const vectOffset = new Vector(0, this.animatable.offsetY);

        const ellipses = this.ellipses;
        const circles = this.circles;

        const iterations = 80;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = Math.round(5 / 255 * size);
        ctx.lineCap = 'butt';

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

            // go over every point of the ellipse
            for (let i = 0; i < iterations; i += 1) {                
                const offset = Math.PI * 2 / iterations * i + atomDisplacement;
                const point = new Vector(radiusX * Math.cos(offset), radiusY * Math.sin(offset));

                const vect = absPosition.clone().add(
                    point.scale(size / 255).setDirection(point.direction() + rotation),
                );

                ctx.beginPath();

                if (vectPrev) {
                    ctx.moveTo(Math.round(vectPrev.x), Math.round(vectPrev.y));
                    ctx.lineTo(Math.round(vect.x), Math.round(vect.y));
                } else {
                    ctx.moveTo(Math.round(vect.x), Math.round(vect.y));
                }

                // higher iteration === color more like on the right side
                const rgb = [
                    map(i, 0, iterations - 1, 38, 97),
                    map(i, 0, iterations - 1, 42, 217),
                    map(i, 0, iterations - 1, 50, 250),
                ];

                ctx.strokeStyle = `rgb(${rgb.join(',')})`;

                ctx.stroke();   
                
                vectPrev = vect;
            }

            ctx.closePath();
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

            ctx.arc(absPosition.x, absPosition.y, radius / 255 * size, 0, Math.PI * 2);
            
            const rgb = [
                97,
                217,
                250,
            ];

            ctx.fillStyle = `rgb(${rgb.join(',')})`;
            ctx.fill();
        });

        requestAnimationFrame(this.updateCanvas);
    }

    render() {
        const styleCanvas = {
            display: 'block',
            position: 'fixed',
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
                width={this.width} 
                height={this.height}
                ref={(c) => {
                    if (c) this.ctx = c.getContext('2d')
                }}
            />
        );
    }
}

export default AtomCanvas;