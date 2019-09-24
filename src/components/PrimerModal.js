import React, { Component } from 'react';

class PrimerModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let ModalProps = {
            showHide: this.props.showHide
        }
        return (
            <ModalContent {...ModalProps} />
        )
    }

}


const ModalContent = () => {
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-header">
                    <h2> </h2>
                    <button type="button" id="descriptionModalClose" class="close" aria-label="close" data-dismiss="modal">
                        <img width="15px" src="" />
                        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" role="img" fill="#383838" focusable="false" aria-labelledby="Zoom Out">
                            <title>Zoom Out</title>
                            <g transform="scale( 1.2 )">
                                <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="modal-body">

                </div>
            </div>
        </div>
    );
}

export default PrimerModal;