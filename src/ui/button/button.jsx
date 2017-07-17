import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

export default class Button extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        handleClick: PropTypes.func
    }

    static defaultProps = {
        title: '',
        handleClick: () => {}
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.handleClick(event);
    }

    render() {
        return (
            <div
                className="button"
                onClick={this.handleClick}
            >
                <section
                    className="button__title"
                >
                    {this.props.title}
                </section>
            </div>
        );
    }
};