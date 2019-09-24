import { connect } from 'react-redux';
import LeftPageSection from '../components/LeftPageSection';
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

const LeftPageSetContainer = connect(
    mapStateToProps,
    mapDispatcherToProps
)(LeftPageSection);

export default LeftPageSetContainer
