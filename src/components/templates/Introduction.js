import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import ImageContainer from '../../containers/ImageContainer';
import ReactGA from '../../analytics';
class IntroductionPage extends Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();
        this.enlargedImg = React.createRef();
        this.enlargedDesc = React.createRef();
        this.enlargedIntroDesc = React.createRef();
        this.modalClose = React.createRef();
        this.bigModal = React.createRef();
        this.bigModalClose = React.createRef();
        this.imageDescriptionModal = React.createRef();
        this.imageDescriptionModalClose = React.createRef();
        document.addEventListener("keydown", this.handleModalKeypress, true);
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
        this.activeModal = "";
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
        if (this.props.data.leftFrame.imageDetails[0].popupFlag == 1) {
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
            this.enlargedIntroDesc.current.focus();
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
            <main>
                <div >
                    <div className="col-row">
                        <div className="grid-col-md-12 leftHeader">
                            <div className="desktop-content">
                                <div className="col-row">
                                    <div className="grid-col-sm-5 grid-col-md-6 content-left-column">
                                        <h2>{this.props.data.templateHeading[0]}</h2>
                                        <article>
                                            <div dangerouslySetInnerHTML={{ __html: this.props.data.rightFrame.HtmlDataBlock }} />
                                        </article>
                                    </div>
                                    <div className="grid-col-sm-7 grid-col-md-6 content-right-column">
                                        {
                                            this.props.data.leftFrame.dataTable &&
                                            <div className="dataTable">
                                                <div dangerouslySetInnerHTML={{ __html: this.props.data.leftFrame.dataTable }} />
                                            </div>
                                        }
                                        {
                                            this.props.data.leftFrame.imageDetails[0].visible === true &&
                                            <div className="imgWithDescription">
											 <div className="alert alert-warning font-italic imgAlert">
                                                   Select the image to enlarge.
                                                </div>
                                                <div className="popupImage">
                                                    <ImageContainer id="Left_image" role="img" src={this.props.data.leftFrame.imageDetails[0].path} alt={this.props.data.leftFrame.imageDetails[0].alt} className="img-responsive" />
                                                    <button ref={this.enlargedImg} className="button button-link zoom" type="button" aria-label="Enlarge Image" data-modal={this.props.data.leftFrame.imageDetails[0].popupFlag == 1 ? "#bigModal" : "#myModal"} onClick={this.openModalBtnClk}><span aria-hidden="true">{zoom_in}</span></button>
                                                </div>
                                                <button ref={this.enlargedIntroDesc} href="javascript:void(0)" id="imageDesLink" data-modal="#imageDescriptionModal" onClick={this.openDescriptionModal}>Image Description</button>
                                            </div>
                                        }
                                    </div>
									 <div className="grid-col-sm-12 grid-col-md-12 content-right-column">
                                        <p>Select the forward arrow to move through the activity.</p>
                                   </div>
                                </div>
                                <div className="col-row">
                                    <div className="grid-col-md-6 content-left-column">
                                        <div className="text-center start-button-wrap">
                                        </div>
                                    </div>
                                    <div className="grid-col-md-6 content-right-column">
                                    </div>
                                </div>
                                <LeftModalPortal {...this.props} refsArr={this.refArr} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const LeftModal = (props) => {
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
                            <ImageContainer src={props.data.leftFrame.imageDetails[0].path} className="img-responsive" />
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
                            <ImageContainer src={props.data.leftFrame.imageDetails[0].path} className="img-responsive" />
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
                            <div dangerouslySetInnerHTML={{ __html: props.data.leftFrame.imageDetails[0].imageDescription }} />

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

export default IntroductionPage;