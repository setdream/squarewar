import React from 'react';

import './field.scss';

export default class Field extends React.Component {
    render() {
        return (
            <div className="field">
                <section className="field__label">{this.props.title}</section>
                <input type="text" className="field__input" value={this.props.default} />
            </div>
        );
    }
};