import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { App as BrightcovePlayer } from '@macmillan-learning/savi-brightcove-player';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import ReactGA from '../../analytics';
export default class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.playVideo = this.playVideo.bind(this);
        this.openDescriptionModal = this.openDescriptionModal.bind(this);
        this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
        this.desModalAccessibility = this.desModalAccessibility.bind(this);
        this.focusLockDesModal = this.focusLockDesModal.bind(this);
        this.handleModalKeypress = this.handleModalKeypress.bind(this);
        document.addEventListener("keydown", this.handleModalKeypress, true);
        this.handleModalKeypress(event);

        this.refsArr = {
            openDescriptionModal: this.openDescriptionModal,
            closeDescriptionModal: this.closeDescriptionModal,
            desModalAccessibility: this.desModalAccessibility,
            focusLockDesModal: this.focusLockDesModal
        }
    }

    playVideo() {
    }

    handleModalKeypress = (event) => {
        if (event.keyCode === 27) {
            this.closeDescriptionModal();
        }
    }

    openDescriptionModal() {
        document.getElementById("imageDescriptionModal").style.display = "block";
        this.desModalAccessibility();
        ReactGA.ga('send', 'event', 'click', 'button', `"videoDescription" has been clicked on page "${this.props.activePage}"`);
    }

    closeDescriptionModal() {
        document.getElementById("imageDescriptionModal").style.display = "none";
        document.getElementById("imageDesLink").focus();
    }

    desModalAccessibility() {
        document.getElementById("imageDescriptionModal").children[0].firstChild.focus();
        setTimeout(function () {
            document.getElementById("descriptionModalClose").focus();
        }, 100);
    }

    focusLockDesModal() {
        document.getElementById("descriptionModalClose").onkeydown = keydown;
        function keydown(e) {
            if (e.which == 9) {
                e.preventDefault();
                document.getElementById("descriptionModalClose").focus();
            }
            if (event.shiftKey && event.keyCode == 9) {
                e.preventDefault();
                document.getElementById("descriptionModalClose").focus();
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
            <div className="videoScreen">
                <button href="javascript:void(0)" id="imageDesLink" data-modal="#imageDescriptionModal" onClick={this.openDescriptionModal}>Video Description</button>
                <div className="videoPlayer grid-col-12 grid-col-md-6">
                    <BrightcovePlayer videoId={this.props.data.mainFrame.videoDetails[0].videoId} />
                </div>
                <VideDescPortal {...this.props} refsArr={this.refsArr} />
            </div>
        );
    }
}

const VideoDescModal = (props) => {
    const zoom_out = <MLIcon
        fill="#383838"
        type="x"
        width="24"
        height="24"
        scale={1.2}
        viewBox="0 0 24 24"
        className="icon" />

    return (
        <div className="modal" style={{ display: 'none' }} id="imageDescriptionModal" onClick={props.refsArr.closeDescriptionModal}>
            <div className="modal-dialog">
                <div className="modal-content" tabIndex="0" aria-label="Video Description">
                    <div className="modal-header">
                        <button type="button" id="descriptionModalClose" className="close" aria-label="close" data-dismiss="modal" onFocus={props.refsArr.focusLockDesModal} onClick={props.refsArr.closeDescriptionModal}><span aria-hidden="true">{zoom_out}</span></button>
                        <h2>Video Description</h2>
                    </div>
                    <div className="modal-body" >
                        <div dangerouslySetInnerHTML={{ __html: props.data.mainFrame.videoDetails[0].description }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const VideDescPortal = (props) => {
    return ReactDOM.createPortal(
        <VideoDescModal {...props} />,
        document.body
    )
}

