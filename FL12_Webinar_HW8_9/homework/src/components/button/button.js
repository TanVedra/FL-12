import React from 'react';
import './button.css';

export default (props) => (
    <button onClick={props.func ? props.func : null}>{props.title}</button>
)