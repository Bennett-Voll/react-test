import React, { Component } from 'react';

import {UnControlled as CodeMirror} from 'react-codemirror2'

import { Vector } from '../helpers';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';

const Frame = (props) => {
    const code = props.code;

    return (
        <iframe class="result" title={Math.random()} ref={(c) => {
            if (c)  {
                (new c.contentWindow.Function('code', 'Vector', `
                    document.body.style.fontFamily = "monospace";

                    try {
                        document.body.innerHTML = '';
                        Function('Vector', code)(Vector);
                    }
                    catch(e) {
                        document.body.innerHTML = e;
                    }
                `))(code, Vector);
            }
        }}>
        </iframe>
    );
};

class CodeEditor extends Component {
    constructor(props) {
        super(props);

        this.options = {
            lineWrapping: true,
            mode: 'javascript',
            theme: '3024-night',
            value: 'test',
        };

        this.updateTimeout = null;

        this.onChange = this.onChange.bind(this);

        this.state = {
            code: props.code || '',
        };
    }

    onChange(editor, data, value) {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }

        this.updateTimeout = setTimeout(() => {
            this.setState({
                code: value,
            });
        }, 500);
    }

    render() {
        const code = this.state.code;
        const options = {
            ...this.options,
            // value: code,
        };

        return (
            <div class="code-editor">
                <CodeMirror options={options} onChange={this.onChange} />
                <Frame code={code}/>
            </div>
        );
    }
}

export default CodeEditor;