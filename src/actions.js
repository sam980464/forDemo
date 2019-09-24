import ReactGA from './analytics';

export const WIDTH_CHANGE = 'WIDTH_CHANGE';
export const LOAD_PRIMER_DATA = 'LOAD_PRIMER_DATA';
export const SHOW_RESTART_MODAL = 'SHOW_RESTART_MODAL';
export const HIDE_RESTART_MODAL = 'SHOW_RESTART_MODAL';
export const RESET_START_OVER = 'RESET_START_OVER';

export const SET_TEXT_MODAL = 'SET_MODAL';
export const SET_IMAGE_MODAL = 'SET_IMAGE_MODAL';

export const SHOW_CHECK_ANSWER = 'SHOW_CHECK_ANSWER';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const AUTO_SHOW_ANSWER = 'AUTO_SHOW_ANSWER';

export const PREV_QUESTION = 'PREV_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const SET_CORRECT_FLAG = 'SET_CORRECT_FLAG';

export const VALIDATE_CHECK_ANSWER_BUTTON = 'VALIDATE_CHECK_ANSWER_BUTTON';

export function loadPrimer(data) {
    ReactGA.set({ page: `savi-${data.primerInfo.analyticsName}` });
    ReactGA.ga('send', 'pageview');
    return { type: LOAD_PRIMER_DATA, payload: data }
}

export function showRestartModal() {

    return { type: SHOW_RESTART_MODAL, payload: true }
}

export function hideRestartModal() {
    return { type: HIDE_RESTART_MODAL, payload: false }
}

export function resetQuestions() {

    return { type: RESET_START_OVER, payload: true }
}

export function prevPage(currentPage, totalPage) {

    return { type: PREV_QUESTION, payload: 1 }
}

export function nextPage(currentPage, totalPage) {

    return { type: NEXT_QUESTION, payload: 1 }
}

//Validate
export function data_Validate(data) {

    return { type: VALIDATE_CHECK_ANSWER_BUTTON, payload: data }
}

export function checkAnswer() {

    return { type: CHECK_ANSWER, payload: true };
}

export function autoShowAnswer() {

    return { type: AUTO_SHOW_ANSWER, payload: true }
}

export function setCorrectFlag() {
    return { type: SET_CORRECT_FLAG, payload: true }
}


export function widthChange() {
    return { type: WIDTH_CHANGE };
}
