import React from 'react';

import './field.scss';

export default class Field extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        default: React.PropTypes.number.isRequired,
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        handleChange: React.PropTypes.func
    }

    static defaultProps = {
        title: '',
        handleChange: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            value: props.default
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });

        this.props.handleChange(event);
    }

    render() {
        return (
            <div className="field">
                <section className="field__label">{this.props.title}</section>
                <input
                    name={this.props.name}
                    type="text"
                    className="field__input"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};