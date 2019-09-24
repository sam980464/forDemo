import * as actions from './actions';

const reducers = (state = {}, action) => {
    let activePagecount;
    let templateType;
    switch (action.type) {
        case actions.LOAD_PRIMER_DATA:
            let primers = action.payload;
            primers.activePage = 0;
            for (let i = 0; i < primers.questionSet.length; i++) {
                if (!primers.questionSet[i].hasOwnProperty('templateType')) {
                    primers.questionSet[i]['editMode'] = false;
                    primers.questionSet[i]['selectedAnswer'] = [];
                    primers.questionSet[i]['ckeckButtonEnable'] = 0;
                    primers.questionSet[i]['showAnswerModal'] = false;
                    primers.questionSet[i]['nextPress'] = true;
                }
            }
            return {
                ...state,
                primers
            }
        case actions.RESET_START_OVER:
            activePagecount = 0;
            return {
                ...state,
                primers: { ...state.primers, activePage: activePagecount }
            };
        case actions.PREV_QUESTION:
            activePagecount = 0;
            if (state.primers.activePage > 1) {
                activePagecount = state.primers.activePage - action.payload
            }
            state.primers.questionSet[activePagecount].nextPress = false;
            return {
                ...state,
                primers: { ...state.primers, activePage: activePagecount }
            };
        case actions.NEXT_QUESTION:
            activePagecount = state.primers.questionSet.length - 1;
            if (state.primers.activePage < state.primers.questionSet.length - 1) {
                activePagecount = state.primers.activePage + action.payload
            }
            state.primers.questionSet[activePagecount].nextPress = true;
            state.primers.questionSet[activePagecount].ckeckButtonEnable = 0;
            return {
                ...state,
                primers: { ...state.primers, activePage: activePagecount }
            };
        case actions.RESET_TEMPLATE_CONTROL:
            return state;

        case actions.VALIDATE_CHECK_ANSWER_BUTTON:
		  
            selectedAnswer = action.payload;
            activePagecount = state.primers.activePage;
            let newState = { ...state };
            newState.primers.questionSet[activePagecount].selectedAnswer = selectedAnswer;
            newState.primers.questionSet[activePagecount].nextPress = false;
            if (newState.primers.questionSet[activePagecount].rightFrame.templateType == "GraphToggleWithDropdown") {
                if (newState.primers.questionSet[activePagecount].selectedAnswer.length == newState.primers.questionSet[activePagecount].rightFrame.dropdownData.dropdownDetails.length) {
                    newState.primers.questionSet[activePagecount].ckeckButtonEnable = 1;
                }else{
					newState.primers.questionSet[activePagecount].ckeckButtonEnable = 0;
				}
            } else if (newState.primers.questionSet[activePagecount].rightFrame.templateType == "MultiSelectOptions") {
                if (selectedAnswer.length > 0 ) {
                    newState.primers.questionSet[activePagecount].ckeckButtonEnable = 1;
                }else{
					newState.primers.questionSet[activePagecount].ckeckButtonEnable = 0;
				}
            } else if (newState.primers.questionSet[activePagecount].rightFrame.templateType == "RadioCheckImage") {

                if (selectedAnswer) {
                    newState.primers.questionSet[activePagecount].ckeckButtonEnable = 1;
                }else{
					newState.primers.questionSet[activePagecount].ckeckButtonEnable = 0;
				}
            }
            else {
                if (newState.primers.questionSet[activePagecount].selectedAnswer.length == newState.primers.questionSet[activePagecount].rightFrame.questionData.questionAnswers.length) {
                    newState.primers.questionSet[activePagecount].ckeckButtonEnable = 1;
                }else{
					newState.primers.questionSet[activePagecount].ckeckButtonEnable = 0;
				}
            }
            return newState;
        case actions.CHECK_ANSWER:

            activePagecount = state.primers.activePage;
            templateType = state.primers.questionSet[activePagecount].rightFrame.templateType;
            let answerSet = [];
            let answerArray;
            if (templateType == "GraphToggleWithDropdown") {
                answerArray = state.primers.questionSet[state.primers.activePage].rightFrame.dropdownData.dropdownDetails;
                for (var loop = 0; loop < answerArray.length; loop++) {
                    answerSet.push(answerArray[loop].dropdownAnswers);
                }
            } else if (templateType == "RadioCheckImage") {
                answerArray = state.primers.questionSet[state.primers.activePage].rightFrame.questionData.questionAnswers;
                for (var loop = 0; loop < answerArray.length; loop++) {
                    answerSet.push(answerArray[loop].value);
                }
            } else {
                answerSet = state.primers.questionSet[state.primers.activePage].rightFrame.questionData.questionAnswers;
            }

            let selectedAnswer = state.primers.questionSet[state.primers.activePage].selectedAnswer;
            let correctAns = true;
            if (answerSet.length == selectedAnswer.length) {
                for (let i = 0; i < answerSet.length; i++) {
                    if (templateType == "DropDownMenu") {
                        if (selectedAnswer[i] != answerSet[i]) {
                            correctAns = false;
                            break;
                        }
                    } else {
                        let index = selectedAnswer.indexOf(answerSet[i]);
                        if (index == -1) {
                            correctAns = false;
                            break;
                        }
                    }
                }
            } else {
                correctAns = false;
            }
            if (!correctAns) {
                state.primers.questionSet[state.primers.activePage].rightFrame.correctAttempts--;
                state.primers.questionSet[state.primers.activePage].selectedAnswer = [];
                state.primers.questionSet[state.primers.activePage].ckeckButtonEnable = 0;

            } else {
                state.primers.questionSet[state.primers.activePage].rightFrame.correctAttempts = 0;
            }
            if (state.primers.questionSet[state.primers.activePage].rightFrame.correctAttempts === 0) {
                state.primers.questionSet[state.primers.activePage].ckeckButtonEnable = 0;
            }

            newState = { ...state };
            newState.primers.questionSet[activePagecount].correctAns = correctAns;
            // newState.primers.questionSet[activePagecount].editMode = (correctAns) ? true : false;
            newState.primers.questionSet[activePagecount].showAnswerModal = true;
            return newState;
        case actions.AUTO_SHOW_ANSWER:
            state.primers.questionSet[state.primers.activePage].editMode = true;
            newState = { ...state };
            return newState;
        case actions.SET_CORRECT_FLAG:
            activePagecount = state.primers.activePage;
            newState = { ...state };
            newState.primers.questionSet[activePagecount].editMode = true;
            return newState;
    }
}

export default reducers;