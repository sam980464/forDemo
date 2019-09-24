import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const data = require('./data/data.json');
const element = document.getElementById('primer-default'); // eslint-disable-line no-undef
const modalMode = element.dataset.modalmode === 'false' ? false : !!element.dataset.modalmode;

ReactDOM.render(
    <App data={data} />,
    element,
);
