import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

export default class Field extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        default: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        handleChange: PropTypes.func
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
        let val = event.target.value;

        if (val < this.props.min) {
            val = this.props.min;
        }

        if (val > this.props.max) {
            val = this.props.max;
        }

        this.setState({
            value: val
        });

        this.props.handleChange(event.target.name, val);
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