import { connect } from 'react-redux';
import TemplateSelect from '../components/TemplateSelect';
import { data_Validate } from '../actions';


const mapStateToProps = (state, ownProps) => {

    return {
        data: state.primers.questionSet[state.primers.activePage],
        activePage: state.primers.activePage,
        totalPages: state.primers.questionSet.length,
        editMode: state.primers.questionSet[state.primers.activePage].editMode,
        correctAttempts: (state) ? (state.primers.questionSet[state.primers.activePage].hasOwnProperty('rightFrame')) ? state.primers.questionSet[state.primers.activePage].rightFrame.correctAttempts : 2 : 2
    }
}

const mapDispacherToProps = (dispatch, ownProps) => {
    return {
        dataValidate: (data) => {
            dispatch(data_Validate(data));
        },
    }
}

const TemplateContainer = connect(
    mapStateToProps,
    mapDispacherToProps
)(TemplateSelect);

export default TemplateContainer;

