import { connect } from 'react-redux';
import Image from '../components/Image';
import { isProduction } from '@macmillan-learning/savi-responsive-component';

const mapStateToProps = (state, ownProps) => {
  const externalImagePath = state.primers.primerInfo.externalImagePath;

  return {
    externalImagePath: isProduction() ? externalImagePath.production : externalImagePath.dev,
    ...ownProps,
  };
};

const ImageContainer = connect(
    mapStateToProps,
)(Image);

export default ImageContainer;
