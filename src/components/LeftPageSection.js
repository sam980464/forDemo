import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from '../analytics';
import PropTypes from 'prop-types';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import ImageContainer from '../containers/ImageContainer';

class LeftPageSection extends Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();
        this.enlargedImg = React.createRef();
        this.enlargedDesc = React.createRef();
        this.modalClose = React.createRef();
        this.bigModal = React.createRef();
        this.bigModalClose = React.createRef();
        this.imageDescriptionModal = React.createRef();
        this.imageDescriptionModalClose = React.createRef();
        document.addEventListener("keydown", this.handleModalKeypress, true);
        this.handleModalKeypress(event);
        this.activeModal = "";

        this.refArr = {
            modal: this.modal,
            enlargedImg: this.enlargedImg,
            enlargedDesc: this.enlargedDesc,
            modalClose: this.modalClose,
            bigModal: this.bigModal,
            bigModalClose: this.bigModalClose,
            imageDescriptionModal: this.imageDescriptionModal,
            imageDescriptionModalClose: this.imageDescriptionModalClose,
            handleModalKeypress: this.handleModalKeypress,
            closeMyModal: this.closeMyModal,
            closeBigModal: this.closeBigModal,
            closeDescriptionModal: this.closeDescriptionModal,
            focusLockMyModal: this.focusLockMyModal,
            focusLockBigModal: this.focusLockBigModal,
            focusLockDesModal: this.focusLockDesModal
        }
    }

    handleModalKeypress = (event) => {

        if (event.keyCode === 27) {
            this.closeMyModal();
            this.closeBigModal();
            this.closeDescriptionModal();
            this.props.triggerActiveModal();
        }
    }
    openModalBtnClk = (e) => {
        if (this.questionSet.leftFrame.imageDetails[0].popupFlag == 1) {
            this.bigModal.current.style.display = "block";
            this.bigModalAccessibility();
            this.activeModal = "bigModal"
        } else {
            this.modal.current.style.display = "block";
            this.myModalAccessibility();
            this.activeModal = "modal";
        }
        this.props.triggerActiveModal(true);
        ReactGA.ga('send', 'event', 'click', 'button', `"imageEnlarge" has been clicked on page "${this.props.activePage}"`);
    }

    myModalAccessibility = () => {
        this.modal.current.children[0].firstChild.focus();
        this.modalClose.current.focus();
    }

    bigModalAccessibility = () => {
        this.bigModal.current.children[0].firstChild.focus();
        this.bigModalClose.current.focus();
    }


    desModalAccessibility = () => {
        this.imageDescriptionModal.current.children[0].firstChild.focus();
        this.imageDescriptionModalClose.current.focus();
    }


    openDescriptionModal = (e) => {
        this.imageDescriptionModal.current.style.display = "block";
        this.desModalAccessibility();
        this.props.triggerActiveModal(true);
        this.activeModal = "descModal";
        ReactGA.ga('send', 'event', 'click', 'button', `"imageDescription" has been clicked on page "${this.props.activePage}"`);
    }

    closeMyModal = (e) => {
        if (this.modal.current && this.activeModal == 'modal') {
            this.modal.current.style.display = "none";
            this.enlargedImg.current.focus();
            this.props.triggerActiveModal(false);
        }
    }

    closeBigModal = (e) => {
        if (this.bigModal.current && this.activeModal == 'bigModal') {
            this.bigModal.current.style.display = "none";
            this.enlargedImg.current.focus();
            this.props.triggerActiveModal(false);
        }
    }

    closeDescriptionModal = (e) => {
        if (this.imageDescriptionModal.current && this.activeModal == 'descModal') {
            this.imageDescriptionModal.current.style.display = "none";
            this.enlargedDesc.current.focus();
            this.props.triggerActiveModal(false);
        }
    }

    focusLockMyModal = () => {
        this.modalClose.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.modalClose.current.focus();
            }
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.modalClose.current.focus();
            }
        };
    }

    focusLockBigModal = () => {
        this.bigModalClose.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.bigModalClose.current.focus();
            }
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.bigModalClose.current.focus();
            }
        };
    }

    focusLockDesModal = () => {
        this.imageDescriptionModalClose.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.imageDescriptionModalClose.current.focus();
            }
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.imageDescriptionModalClose.current.focus();
            }
        };
    }



    render() {
        this.questionSet = this.props.data[(this.props.activePage)];
        let leftImage;
        const zoom_in = <MLIcon
            fill="#ffffff"
            type="zoom_in"
            width="24"
            height="24"
            scale={1.2}
            viewBox="0 0 24 24"
            className="icon" />
        const zoom_out = <MLIcon
            fill="#383838"
            type="x"
            width="24"
            height="24"
            scale={1.2}
            viewBox="0 0 24 24"
            className="icon" />
        //Setting Iage For Display 
        let imgStyle = {
            height: this.questionSet.leftFrame.imageDetails[0]['height'],
            width: this.questionSet.leftFrame.imageDetails[0]['width']
        }
        if (this.questionSet.leftFrame.imageDetails[0].visible) {
            leftImage = <div className="question-image" >
                <div className="alert alert-warning font-italic imgAlert">
                    Select the image to enlarge.
				</div>
                <div className="popupImage">
                    <ImageContainer src={this.questionSet.leftFrame.imageDetails[0].path} id="Left_image" role="img"
                        alt={this.questionSet.leftFrame.imageDetails[0].alt}
                        style={imgStyle}
                        className="img-responsive" />
                    <button ref={this.enlargedImg} className="button button-link zoom" type="button" aria-label="Enlarge Image" data-modal={this.questionSet.leftFrame.imageDetails[0].popupFlag == 1 ? "#bigModal" : "#myModal"} onClick={this.openModalBtnClk}><span aria-hidden="true">{zoom_in}</span></button>

                    {/* added aria-hidden property as per TFA comment */}
                    <LeftModalPortal {...this.props} refsArr={this.refArr} />
                </div>
                <button ref={this.enlargedDesc} href="javascript:void(0)" id="imageDesLink" data-modal="#imageDescriptionModal" onClick={this.openDescriptionModal}>Image Description</button>
            </div>
        }

        return (
            <div className="grid-col-sm-5 grid-col-md-4 content-left-column">
                {leftImage}
                {this.questionSet.leftFrame.dataTable &&
                    <div className="dataTable">
                        <div dangerouslySetInnerHTML={{ __html: this.questionSet.leftFrame.dataTable }} />
                    </div>
                }
            </div>
        )
    }
}

const LeftModal = (props) => {
    const questionSet = props.data[(props.activePage)];
    const zoom_in = <MLIcon
        fill="#ffffff"
        type="zoom_in"
        width="24"
        height="24"
        scale={1.2}
        viewBox="0 0 24 24"
        className="icon" />
    const zoom_out = <MLIcon
        fill="#383838"
        type="x"
        width="24"
        height="24"
        scale={1.2}
        viewBox="0 0 24 24"
        className="icon" />
    return (
        <Fragment>
            <div className="modal" style={{ display: 'none' }} id="myModal" ref={props.refsArr.modal} onClick={props.refsArr.closeMyModal}>
                <div className="modal-dialog">
                    <div className="modal-content" tabIndex="0">
                        <div className="modal-header">
                            <button ref={props.refsArr.modalClose} type="button" id="myModalClose" className="close" aria-label="close" data-dismiss="modal" onFocus={props.refsArr.focusLockMyModal} onClick={props.refsArr.closeMyModal}><span aria-hidden="true">{zoom_out}</span></button>
                            <h2>Enlarged Image</h2>
                        </div>
                        <div className="modal-body" >
                            <ImageContainer src={questionSet.leftFrame.imageDetails[0].path} className="img-responsive" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" style={{ display: 'none' }} id="bigModal" ref={props.refsArr.bigModal} onClick={props.refsArr.closeBigModal}>
                <div className="modal-dialog">
                    <div className="modal-content" tabIndex="0">
                        <div className="modal-header">
                            <button ref={props.refsArr.bigModalClose} type="button" id="bigModalClose" className="close" aria-label="close" data-dismiss="modal" onFocus={props.refsArr.focusLockBigModal} onClick={props.refsArr.closeBigModal}><span aria-hidden="true">{zoom_out}</span></button>
                            <h2>Enlarged Image</h2>
                        </div>
                        <div className="modal-body">
                            <ImageContainer src={questionSet.leftFrame.imageDetails[0].path} className="img-responsive" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" style={{ display: 'none' }} id="imageDescriptionModal" ref={props.refsArr.imageDescriptionModal} onClick={props.refsArr.closeDescriptionModal}>
                <div className="modal-dialog">
                    <div className="modal-content" tabIndex="0">
                        <div className="modal-header">
                            <button ref={props.refsArr.imageDescriptionModalClose} type="button" id="descriptionModalClose" className="close" aria-label="close" data-dismiss="modal" onFocus={props.refsArr.focusLockDesModal} onClick={props.refsArr.closeDescriptionModal}><span aria-hidden="true">{zoom_out}</span></button>
                            <h2>Image Description</h2>
                        </div>
                        <div className="modal-body" >
                            <div dangerouslySetInnerHTML={{ __html: questionSet.leftFrame.imageDetails[0].imageDescription }} />

                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

const LeftModalPortal = (props) => {
    return ReactDOM.createPortal(
        <LeftModal {...props} />,
        document.body
    )
}

export default LeftPageSection; 