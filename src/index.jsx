// import App from './app/app';

// const app = new App();

// app.init().then(function(document) {
//     app.run(document, document.body);
// });

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