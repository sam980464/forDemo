import { connect } from 'react-redux';
import RightPageSection from '../components/RightPageSection';
import { resetTemplateControls } from '../actions';


const mapStateToProps = (state) => {
    return {
        data: state.primers.questionSet,
        activePage: state.primers.activePage,
        editMode: state.primers.questionSet[state.primers.activePage].editMode
    }
}

const mapDispatcherToProps = (state, ownProps) => {
    return {
        resetTemplateControls: (templateName) => {
            dispatch(resetTemplateControls(templateName));
        }
    }
}

const RightPageSetContainer = connect(
    mapStateToProps,
    mapDispatcherToProps
)(RightPageSection);

export default RightPageSetContainer;
