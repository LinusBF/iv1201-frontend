import React from 'react';
// eslint-disable-next-line react/no-deprecated,no-unused-vars
const {PropTypes} = React;

const icons = {
  bin2:
    'M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z',
};

const Icon = props => (
  <svg width="22" height="22" color={'#ffffff'} viewBox="0 0 1024 1024">
    <path d={icons[props.icon]}></path>
  </svg>
);

export default Icon;
