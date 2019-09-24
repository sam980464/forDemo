import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import PropTypes from 'prop-types';
import ReactGA from '../analytics';

class Header extends Component {
    constructor(props) {
        super(props);
        this.header = React.createRef();
        this.mainContainer = React.createRef();
        this.resetBtn = React.createRef();
        this.resetModal = React.createRef();
        this.resetClose = React.createRef();
        this.resetCancel = React.createRef();
        this.resetOk = React.createRef();
        this.handleModalKeypress = this.handleModalKeypress.bind(this);
        this.prevPageCount = 0;
        this.resetButtonVisibility = false;
        this.refArr = {
            resetBtn: this.resetBtn,
            resetModal: this.resetModal,
            resetClose: this.resetClose,
            resetCancel: this.resetCancel,
            resetOk: this.resetOk,
            handleClick_ResetBtn: this.handleClick_ResetBtn,
            handleClick_CloseModal: this.handleClick_CloseModal,
            handleClick_StartOver: this.handleClick_StartOver,
            handleModalKeypress: this.handleModalKeypress,
            focusLockOkReset: this.focusLockOkReset,
            focusLockCloseReset: this.focusLockCloseReset
        }
    }



    handleClick_ResetBtn = (e) => {
        this.resetModal.current.style.display = "block";
        this.resetModal.current.children[0].firstChild.focus();

        setTimeout(() => { this.resetClose.current.focus() }, 100);
        document.addEventListener("keydown", this.handleModalKeypress, true);
        this.handleModalKeypress(event);
        this.props.triggerActiveModal(true);
    }

    handleClick_CloseModal = (e) => {
        this.resetModal.current.style.display = "none";
        this.resetBtn.current.focus();
        this.props.triggerActiveModal(false);
    }
    handleClick_StartOver = (e) => {
        this.resetModal.current.style.display = "none";
        this.props.resetClick();
        ReactGA.ga('send', 'event', 'click', 'button', `"startOver" has been clicked on page "${this.props.activePage}"`);
        window.location.reload();
    }

    handleModalKeypress = (event) => {
        if (event.keyCode === 27) {
            this.handleClick_CloseModal();
        }
    }

    focusLockOkReset = () => {
        this.resetCancel.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.resetClose.current.focus();
            }
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.resetOk.current.focus();
            }
        };
    }

    focusLockCloseReset = () => {
        this.resetClose.current.onkeydown = (e) => {
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.resetCancel.current.focus();
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activePage == 0) {
            this.resetBtn.current.style.display = "none";
        } else {
            this.resetBtn.current.style.display = "block";
        }
        if (this.prevPageCount != nextProps.activePage) {
            if (this.resetBtn.current) {
                setTimeout(() => { this.resetBtn.current.focus() }, 100);
            }
            this.prevPageCount = nextProps.activePage;
        }
    }


    componentWillMount() {
        let modalBtns = Array.prototype.slice.call(document.querySelectorAll(".removeFocus"), 0);
        modalBtns.forEach(function (btn) {
            btn.onclick = function () {
                let modal = btn.getAttribute('data-modal');
                document.getElementById(modal).style.display = "block";
            }
        });

        let closeBtns = Array.prototype.slice.call(document.querySelectorAll(".close"), 0);
        closeBtns.forEach(function (btn) {
            btn.onclick = function () {
                let modal = btn.closest('.modal');
                modal.style.display = "none";
            }
        });
    }

    render() {
        const backArrow = <MLIcon
            title="Back"
            fill="#ffffff"
            type="arrow_left"
            width="24"
            height="24"
            scale={1}
            viewBox="0 0 24 24"
            className="icon"
        />;
        const menu = <MLIcon
            title="Menu"
            fill="#000000"
            type="replay"
            width="24"
            height="24"
            scale={1}
            viewBox="0 0 24 24"
            className="icon"
        />;
        const close = <MLIcon
            title="close"
            fill="#636c72"
            type="x"
            width="24"
            height="24"
            scale={1}
            viewBox="0 0 24 24"
            className="icon"
        />;

        return (
            <header className="header" id="header">
                <div className="main-container">
                    <nav className="navbar navbar-expand-lg navbar-light desktop-header">
                        <h1 className="navbar-brand" tabIndex="-1" id="pageHeadingTxt">{this.props.data.primerName} | <i> {this.props.data.sessionName} </i></h1>
                        <button id="reset" ref={this.resetBtn} className="button button-secondary my-2 my-sm-0 mr-3" onClick={this.handleClick_ResetBtn} >Start Over</button>
                    </nav>
                </div>
                {/* Header StartOver Modal */}
                <HeaderModalPortal {...this.props} refsArr={this.refArr} />
            </header>
        )
    }
}

Header.propTypes = {
    activePage: PropTypes.number.isRequired,
    resetClick: PropTypes.func.isRequired
}


const HeaderModal = (props) => {
    const close = <MLIcon
        title="close"
        fill="#636c72"
        type="x"
        width="24"
        height="24"
        scale={1}
        viewBox="0 0 24 24"
        className="icon"
    />;

    return (
        <div className="modal" id="resetModal" style={{ display: 'none' }} ref={props.refsArr.resetModal} onClick={props.refsArr.handleClick_CloseModal}>
            <div className="modal-dialog">
                <div className="modal-content" tabIndex="0" aria-live="assertive">
                    <div className="modal-header header-modal">
                        <div className="headLeft">
                            <h3>Start Over</h3>
                        </div>
                        <div className="headRight">
                            <button type="button" id="resetClose" ref={props.refsArr.resetClose} className="button button-link closeModal" aria-label="close" onFocus={props.refsArr.focusLockCloseReset} onClick={props.refsArr.handleClick_CloseModal}>{close}</button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <p>You are trying to reset all the activities within this session. Are you sure?</p>
                    </div>
                    <div className="modal-footer" role="application" id="resetModalFooter">
                        <button role="button" id="resetOk" ref={props.refsArr.resetOk} className="button button-secondary red" onClick={props.refsArr.handleClick_StartOver} >Start Over </button>
                        <button type="button" id="resetCancel" ref={props.refsArr.resetCancel} className="button button-primary close" data-dismiss="modal" onFocus={props.refsArr.focusLockOkReset} onClick={props.refsArr.handleClick_CloseModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HeaderModalPortal = (props) => {

    return ReactDOM.createPortal(
        <HeaderModal {...props} />,
        document.body
    )
}

export default Header;