/*
 * ...достань из чемодана пистолет,
 * достань и заложи его в ломбард... (И. А. Бродский)
 */

import React from 'react';
import ReactDOM from 'react-dom';

import "normalize.css/normalize.css";
import './resources/styles/style.scss';

import Menu from './ui/menu/menu.jsx';

ReactDOM.render(
  <section className="interface">
    <Menu />
  </section>,
  document.getElementById('app-container')
);