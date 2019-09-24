import React from 'react';
import PropTypes from 'prop-types';

const omit = require('lodash.omit');

const Image = (props) => {
  const imageProps = omit(props, ['dispatch', 'externalImagePath']);
  if (!props.externalImagePath && imageProps.src) {
    imageProps.src = require('../data/assets/images/' + imageProps.src);
  } else {
    imageProps.src = `${props.externalImagePath}${props.src}`;
  }

  return (
    <img {...imageProps} />
  );
};

Image.propTypes = {
  externalImagePath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Image.defaultProps = {
  alt: '',
};


export default Image;
