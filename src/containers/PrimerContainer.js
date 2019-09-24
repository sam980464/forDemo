import { connect } from 'react-redux';
import PrimerWrapper from '../components/PrimerWrapper';
import { loadPrimer, data_Validate, resetQuestions, prevPage, nextPage, checkAnswer, autoShowAnswer, setCorrectFlag } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        data: (state) ? state.primers : ownProps.data,
        activePage: (state) ? state.primers.activePage : ownProps.data.activePage,
        currentPageCount: (state) ? state.primers.questionSet.length : ownProps.data.questionSet.length,
        checkAnswerButtonState: (state) ? state.primers.questionSet[state.primers.activePage].ckeckButtonEnable : 0,
        editMode: (state) ? state.primers.questionSet[state.primers.activePage].editMode : false,
        checkAnswer: (state) ? (state.primers.questionSet[state.primers.activePage].hasOwnProperty('correctAns')) ? state.primers.questionSet[state.primers.activePage].correctAns : false : false,
        showAnswerModal: (state) ? state.primers.questionSet[state.primers.activePage].showAnswerModal : true,
        correctAttempts: (state) ? (state.primers.questionSet[state.primers.activePage].hasOwnProperty('rightFrame')) ? state.primers.questionSet[state.primers.activePage].rightFrame.correctAttempts : 2 : 2,
        nextPress: (state) ? state.primers.questionSet[state.primers.activePage].nextPress : false,
    }
}

const mapDispatcherToProps = (dispatch, ownProps) => {
    return {
        loadPrimer: () => {
            dispatch(loadPrimer(ownProps.data));
        },
        resetStartOver: () => {
            dispatch(resetQuestions());
        },
        prevPage: () => {
            dispatch(prevPage(ownProps.data.activePage, ownProps.data.questionSet.length));
        },
        nextPage: () => {
            dispatch(nextPage(ownProps.data.activePage, ownProps.data.questionSet.length));
        },
        checkAnswer: () => {
            dispatch(checkAnswer());
        },
        autoShowAnswer: () => {
            dispatch(autoShowAnswer());
        },
        setCorrectFlag: () => {
            dispatch(setCorrectFlag());
        },
        dataValidate: (data) => {
            dispatch(data_Validate(data));
        }
    }
}

const PrimerContainer = connect(
    mapStateToProps,
    mapDispatcherToProps
)(PrimerWrapper);

export default PrimerContainer;