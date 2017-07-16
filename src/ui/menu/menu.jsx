import React from 'react';
import Game from '../../game/index';

import './menu.scss';

import Button from '../button/button.jsx';
import Field from '../field/field.jsx';

import CONSTANTS from '../constants/common';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            [CONSTANTS.MENU_FIELD_MAX_SIZE.NAME]: CONSTANTS.MENU_FIELD_MAX_SIZE.VALUES.DEFAULT,
            [CONSTANTS.MENU_FIELD_MIN_SIZE.NAME]: CONSTANTS.MENU_FIELD_MIN_SIZE.VALUES.DEFAULT,
            [CONSTANTS.MENU_FIELD_COUNT.NAME]: CONSTANTS.MENU_FIELD_COUNT.VALUES.DEFAULT,
        };

        this.handleChangeParams = this.handleChangeParams.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }

    handleChangeParams(event) {
        this.setState({
            [event.targer.name]: event.targer.value
        });
    }

    handleStart() {
        const game = new Game(this.state);

        game.init().then(function(document) {
            game.run(document, document.body);
        });
    }

    render() {
        return (
            <div className="menu">
                <section className="menu__title">
                    {CONSTANTS.MENU_TITLE}
                </section>
                <section className="menu__content">
                    {CONSTANTS.MENU_DESCRIPTION}
                </section>
                <section className="menu__fields">
                    <Field
                        title={CONSTANTS.MENU_FIELD_MAX_SIZE.TITLE} 
                        default={CONSTANTS.MENU_FIELD_MAX_SIZE.VALUES.DEFAULT}
                        max={CONSTANTS.MENU_FIELD_MAX_SIZE.VALUES.MAX}
                        min={CONSTANTS.MENU_FIELD_MAX_SIZE.VALUES.MIN}
                        name={CONSTANTS.MENU_FIELD_MAX_SIZE.NAME}
                        handleChannge={this.handleChangeParams}
                    />
                    <Field
                        title={CONSTANTS.MENU_FIELD_MIN_SIZE.TITLE}
                        default={CONSTANTS.MENU_FIELD_MIN_SIZE.VALUES.DEFAULT}
                        max={CONSTANTS.MENU_FIELD_MIN_SIZE.VALUES.MAX}
                        min={CONSTANTS.MENU_FIELD_MIN_SIZE.VALUES.MIN}
                        name={CONSTANTS.MENU_FIELD_MIN_SIZE.NAME}
                        handleChannge={this.handleChangeParams}
                    />
                    <Field
                        title={CONSTANTS.MENU_FIELD_COUNT.TITLE} 
                        default={CONSTANTS.MENU_FIELD_COUNT.VALUES.DEFAULT}
                        max={CONSTANTS.MENU_FIELD_COUNT.VALUES.MAX}
                        min={CONSTANTS.MENU_FIELD_COUNT.VALUES.MIN}
                        name={CONSTANTS.MENU_FIELD_COUNT.NAME}
                        handleChannge={this.handleChangeParams}
                    />
                </section>
                <section className="menu__controls">
                    <Button
                        title={CONSTANTS.START_BUTTON_TITLE}
                        handleClick={this.handleStart}
                    />
                </section>
            </div>
        );
    }
};