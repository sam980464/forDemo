import React, { Component } from 'react';
import ReactGA from '../analytics';
import ReactDOM from 'react-dom';
class ModalChild extends Component {
    constructor(props) {
        super(props);
        this.modal = "";
        this.successModal = React.createRef();
        this.errorModal = React.createRef();
        this.actionButton = React.createRef();
        this.state = {
            clickCountError: 0
        }


    }

    showSucessModal() {
        this.props.triggerActiveModal(true);
        return (
            <div role="dialog" ref={this.successModal}>
                <div id="overlay"></div>
                <div id="successAlert" className="text-left alert alert-success alert-dismissible show" role="alert" aria-live="assertive" tabIndex="0">
                    <h3 aria-label="correct">Correct</h3>
                    <div dangerouslySetInnerHTML={{ __html: this.props.successMsg }} />
                    <div className="buttonBlock">
                        <button type="button" ref={this.actionButton} className="button button-primary tryAgain" aria-label="OK" onFocus={this.feedBack} onClick={this.closeSuccessAlert}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    closeSuccessAlert = (e) => {
        this.successModal.current.style.display = "none";
        this.props.setCorrectFlag();
        this.props.nextFocus();
        this.props.triggerActiveModal(false);
    }

    showIncorrectModal() {
        this.props.triggerActiveModal(true);
        return (
            <div role="dialog" ref={this.errorModal} id="modalRef">
                <div id="overlay"></div>
                <div id="errorAlert" className="text-left alert alert-danger alert-dismissible show" role="alert" aria-live="assertive" tabIndex="0">
                    <h3 aria-label="Incorrect">Incorrect</h3>
                    {
                        this.props.correctAttempts === 1 &&
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: this.props.errorMsg }} />
                            <br />You have one more chance to answer the question correctly.
                            <div className="buttonBlock">
                                <button type="button" ref={this.actionButton} className="button button-primary tryAgain" aria-label={this.props.correctAttempts === 0 ? "Close" : "Try Again"} onFocus={this.feedBack} onClick={this.tryAgainAlert}>Try Again</button>
                            </div>
                        </div>
                    }
                    {
                        this.props.correctAttempts === 0 &&
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: this.props.finalFeedback }} />
                            <br />That was your last attempt at this question.
                            <div className="buttonBlock">
                                <button id="show" ref={this.actionButton} className="button button-primary showAnswer" type="button" onFocus={this.feedBack} onClick={this.showAnswer}>Show Answer</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
    componentWillReceiveProps(newProps) {
        if (newProps.correctAttempts == 0) {
            this.errorModal.current.style.display = "block";

        }
    }

    tryAgainAlert = (e) => {
        this.errorModal.current.style.display = "none";
        document.getElementById("form").reset();
        this.props.focusControl();
        this.props.triggerActiveModal(false);
        ReactGA.ga('send', 'event', 'click', 'button', `"tryAgain" has been clicked on page "${this.props.activePage}"`);
    }

    showAnswer = () => {
        this.errorModal.current.style.display = "none";
        document.getElementById("form").reset();
        this.props.showAnswer();
        this.props.triggerActiveModal(false);
        ReactGA.ga('send', 'event', 'click', 'button', `"showAnswer" has been clicked on page "${this.props.activePage}"`);
        this.props.nextFocus();
    }

    feedBack = () => {
        this.actionButton.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.actionButton.current.focus();
            }
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.actionButton.current.focus();
            }
        };
    }

    componentDidMount() {
        if (this.props.nextPress && this.props.correctAttempts == 1) {
            this.errorModal.current.style.display = "none";
        }
    }

    render() {
        if (this.props.correctAns) {
            this.modal = this.showSucessModal();

        } else {
            this.modal = this.showIncorrectModal();
        }
        setTimeout(() => {
            if (this.actionButton.current) { this.actionButton.current.focus(); }


        }, 500);
        return (
            <div className="content-status">
                {this.props.correctAns && this.showSucessModal()}
                {!this.props.correctAns && this.showIncorrectModal()}
            </div>
        )
    }
}


const Modal = (props) => {
    return ReactDOM.createPortal(
        <ModalChild {...props} />, document.body
    )
}

export default Modal;