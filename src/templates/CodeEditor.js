import React, { Component } from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2'

import { Vector, Trigger } from 'helpers';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/erlang-dark.css';

const setupCanvas = (window) => {
    const doc = window.document;
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.right = '0';
    canvas.style.bottom = '0';
    canvas.style.display = 'block';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    const ctx = canvas.getContext('2d');

    ctx.pointWidth = 4;

    ctx.drawPoint = (function(x, y) {
        this.fillRect(x - ctx.pointWidth / 2, y - ctx.pointWidth / 2, ctx.pointWidth, ctx.pointWidth);
    }).bind(ctx);

    window.ctx = ctx;
    window.width = window.innerWidth;
    window.height = window.innerHeight;

    doc.body.appendChild(canvas);
};

class Frame extends Component {
    constructor(props) {
        super(props);

        // setup trigger that gets passed into iframe
        // used for checking if the iframe changes size
        this.onFrame = this.onFrame.bind(this);
        this.iframeResize = new Trigger();
    }

    componentDidMount() {
        Trigger.on('frame', this.onFrame);
    }

    componentWillUnmount() {
        Trigger.off('frame', this.onFrame);
    }

    onFrame() {
        if ( ! this.iframe) {
            return;
        } 

        if ( ! this.dimensions) {
            this.dimensions = {
                width: this.iframe.clientWidth,
                height: this.iframe.clientHeight,
            };
        }

        // dimensions have changed? Fire trigger
        if (this.dimensions.width !== this.iframe.clientWidth ||
            this.dimensions.height !== this.iframe.clientHeight) {
            this.dimensions = {
                width: this.iframe.clientWidth,
                height: this.iframe.clientHeight,
            };

            this.iframeResize.fire();
        }
    }

    render() {
        const code = this.props.code;
        
        // define new trigger so to prevent readding callback over and over again
        // to the same one
        this.iframeResize = new Trigger();

        return (
            <iframe className="result" title={Math.random()} ref={(c) => {
                if (c)  {
                    this.iframe = c;

                    // recalculate all when iframe resizes
                    const recalculate = () => {
                        // empty body of iframe, set variables and set font
                        c.contentWindow.document.body.innerHTML = '';
                        c.contentWindow.document.body.style.fontFamily = 'monospace';
                        c.contentWindow.Vector = Vector;

                        // setup body of iframe with canvas
                        setupCanvas(c.contentWindow);

                        (new c.contentWindow.Function('code', `
                            try {
                                Function(code)();
                            }
                            catch(e) {
                                document.body.innerHTML = e;
                            }
                        `))(code);
                    };

                    this.iframeResize.add(recalculate);

                    recalculate();
                }
            }}>
            </iframe>
        );
    }
};

class CodeEditor extends Component {
    constructor(props) {
        super(props);

        this.options = {
            lineWrapping: true,
            mode: 'javascript',
            theme: 'erlang-dark',
        };

        this.onChange = this.onChange.bind(this);

        this.state = {
            code: this.props.code || '',
        };
    }

    onChange(editor, data, value) {
        this.setState({
            code: value,
        });
    }

    render() {
        const code = this.state.code;
        const options = {
            ...this.options,
        };

        return (
            <div class="code-editor">
                <CodeMirror value={code} options={options} onBeforeChange={this.onChange} />
                <Frame code={code}/>
            </div>
        );
    }
}

export default CodeEditor;