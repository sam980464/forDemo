import React, { Component } from 'react';
import Modal from './Modal';
import ReactGA from '../analytics';
class Validate extends Component {
    constructor(props) {
        super(props);
    }

    validate = (e) => {
        this.props.checkAnswer();
        ReactGA.ga('send', 'event', 'click', 'button', `"checkAnswer" has been clicked on page "${this.props.activePage}"`);
    }

    render() {
        let templateType = (this.props.data[this.props.activePage].hasOwnProperty('templateType')) ? this.props.data[this.props.activePage].templateType : this.props.data[this.props.activePage].rightFrame.templateType;
        let checkButton = "";
        let disabledClass = "";
        let successMsg = this.props.data[this.props.activePage].rightFrame.successMsg;
        let errorMsg = this.props.data[this.props.activePage].rightFrame.errorMsg;
        let correctAttempts = this.props.correctAttempts;
        let finalFeedback = this.props.data[this.props.activePage].rightFrame.finalFeedback;
        let disabledInput = false;
        if (!this.props.editFlag) {
            if (this.props.checkAnswerButtonState == 0) {
                disabledClass = 'disabled-link';
                disabledInput = true;
            } else {
                disabledClass = "";
                disabledInput = false;
            }
            checkButton = <div className="button-block text-right"><button disabled={disabledInput} id="check" className={"button button-primary " + disabledClass} type="button" onClick={() => this.validate(templateType)}>Check Answer</button></div>
        }

        return (
            <div>
                {checkButton}
                {
                    this.props.showModal &&
                    !this.props.editFlag &&
                    <Modal
                        currentData={this.props.data[this.props.activePage]}
                        activePage={this.props.activePage}
                        setCorrectFlag={this.props.setCorrectFlag}
                        correctAns={this.props.data[this.props.activePage].correctAns}
                        successMsg={successMsg} errorMsg={errorMsg}
                        correctAttempts={this.props.correctAttempts}
                        finalFeedback={finalFeedback}
                        showAnswer={this.props.autoShowAnswer}
                        nextPress={this.props.nextPress}
                        focusControl={this.props.focusControl}
                        nextFocus={this.props.nextFocus}
                        triggerActiveModal={this.props.triggerActiveModal}
                    />}
            </div>
        )
    }
}


export default Validate;