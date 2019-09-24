import { connect } from 'react-redux';
import SinglePageSection from '../components/SinglePageSection';
import * as actions from '../actions';


const mapStateToProps = (state, ownProps) => {

    return {
        data: state.primers.questionSet,
        activePage: state.primers.activePage
    }
}

const mapDispatcherToProps = (state, ownProps) => {
    return {

    }
}

const SinglePageSetContainer = connect(
    mapStateToProps,
    mapDispatcherToProps
)(SinglePageSection);

export default SinglePageSetContainer;
