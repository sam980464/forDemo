import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { ResponsiveWrapper } from '@macmillan-learning/savi-responsive-component';
import storeFactory from '../store';
import PrimerContainer from '../containers/PrimerContainer';
import '../stylesheets/scss/scss.scss';
import '../analytics';
const store = storeFactory();

const App = (props) => {
  return (
    <Provider store={store}>
      <ResponsiveWrapper
        name="savi-hlw-primer-engine"

        breakpoints={{
          small: [0, 767],
          medium: [768, 1439],
          large: [1440, '~'],
        }}
      >
        <div className="savi-hlw-primers">
          <div className="savi-hlw-primers-wrapper" >
            <PrimerContainer data={props.data} />
          </div>
        </div>
      </ResponsiveWrapper>
    </Provider>
  );
};

App.propTypes = {
  data: PropTypes.object.isRequired,
};

export default App;

