import React, { Component } from 'react';
import ImageContainer from '../../containers/ImageContainer';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';

class RadioCheckImage extends Component {
    constructor(props) {
        super(props);
        this.singleCreateRadioCheckOptions = this.singleCreateRadioCheckOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.multiDropDownValues = [];
        this.userDataObj = [];
        this.formRef = React.createRef();
        this.imageDescriptionModal = React.createRef();
        this.imageDescriptionModalClose = React.createRef();
        document.addEventListener("keydown", this.handleModalKeypress, true);
        this.handleModalKeypress(event);
        this.imageDescData = "";
        this.radioRef = [];

    }

    componentDidMount() {
        this.props.childRef(this.radioRef);
    }

    handleModalKeypress = (event) => {

        if (event.keyCode === 27) {

            this.closeDescriptionModal();
        }

    }

    openDescriptionModal = (e) => {
        this.imageDescData = e.target.dataset.value;
        this.imageDescriptionModal.current.style.display = "block";
        this.desModalAccessibility();
        this.setState({});
    }
    desModalAccessibility = () => {
        this.imageDescriptionModal.current.children[0].firstChild.focus();
        this.imageDescriptionModalClose.current.focus();
    }

    focusLockDesModal = () => {
        this.imageDescriptionModalClose.current.onkeydown = (e) => {
            if (e.which == 9) {
                e.preventDefault();
                this.imageDescriptionModalClose.focus();
            }
            if (event.shiftKey && event.keyCode == 9) {
                e.preventDefault();
                this.imageDescriptionModalClose.focus();
            }
        };
    }

    closeDescriptionModal = (e) => {
        this.imageDescriptionModal.current.style.display = "none";
    }


    componentWillReceiveProps(newProps) {
        this.formRef.current.reset();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentPageCount !== this.props.currentPageCount) {
            var radList1 = document.getElementsByName(`group${this.props.currentPageCount}`);
            for (var i = 0; i < radList1.length; i++) {
                (radList1[i].parentElement.classList.length == 1) && (radList1[i].parentElement.classList.remove('disabled-input'));
                if (radList1[i].checked) radList1[i].checked = false;
            }
        }
    }

    singleCreateRadioCheckOptions() {

        let table = [];
        let editCheckClass;
        let disableCheckClass = "";
        let disabledInput = false;
        if (this.props.editFlag || this.disableContent) {
            disableCheckClass = " disabled-input";
            disabledInput = true;
        }
        for (let i = 0; i < this.props.data.questionData.questionOptions.length; i++) {
            editCheckClass = "";
            if (this.props.editFlag) {
                for (let j = 0; j < this.props.data.questionData.questionAnswers.length; j++) {
                    if (this.props.data.questionData.questionAnswers[j].value === this.props.data.questionData.questionOptions[i].value) {
                        editCheckClass = " editClass";
                    }
                }
            }
            table.push(
                <div key={i} className="grid-col-sm-4">
                    <div className="form-check">
                        <label tabIndex="0" className={"radio" + disableCheckClass}>
                            <ImageContainer src={this.props.data.questionData.questionOptions[i].path} id="Right_image" role="img"
                                alt={this.props.data.questionData.questionOptions[i].alt}
                                className="img-responsive" />
                            <input ref={radio => { this.radioRef[i] = radio; }} disabled={disabledInput} className={"form-check-input" + editCheckClass} name={"group" + this.props.currentPageCount} aria-selected="false" type="radio" onClick={this.selectOption} value={this.props.data.questionData.questionOptions[i].value} />
                            <span id={`abc${i}`} className={"radioSelector" + editCheckClass}></span>
                            <span htmlFor={`abc${i}`}>
                                <span className="innerSpan" dangerouslySetInnerHTML={{ __html: this.props.data.questionData.questionOptions[i].value }}></span>
                            </span>
                        </label>
                    </div>
                    <a href="javascript:void(0)" id="imageDesLink" data-value={this.props.data.questionData.questionOptions[i].imageDescription} ref={this.imageDescriptionModal} data-modal="#imageDescriptionModal" onClick={this.openDescriptionModal}>Image Description</a>
                </div>
            )
        }
        return table;
    }

    selectOption(event) {
        this.userDataObj[0] = event.target.value;
        this.props.validate(this.userDataObj);
        this.userDataObj = [];

    }

    render() {
        const zoom_out = <MLIcon
            title="Zoom Out"
            fill="#383838"
            type="x"
            width="24"
            height="24"
            scale={1.2}
            viewBox="0 0 24 24"
            className="icon" />
        return (
            <div>
                <form id="form" ref={this.formRef}>
                    <div className="radiocheckoptions"> {this.singleCreateRadioCheckOptions()}</div>
                </form>
                <div className="modal" id="imageDescriptionModal" ref={this.imageDescriptionModal} onClick={this.closeDescriptionModal}>
                    <div className="modal-dialog">
                        <div className="modal-content" tabIndex="0">
                            <div className="modal-header">
                                <h2>Image Description</h2>
                                <button ref={this.imageDescriptionModalClose} type="button" id="descriptionModalClose" className="close" aria-label="close" data-dismiss="modal" onFocus={this.focusLockDesModal} onClick={() => this.closeDescriptionModal}><img width="15px" src="" /><span aria-hidden="true">{zoom_out}</span></button>
                            </div>
                            <div className="modal-body" >
                                <div dangerouslySetInnerHTML={{ __html: this.imageDescData }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default RadioCheckImage;