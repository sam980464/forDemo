import React, { Component } from 'react';
import ImageContainer from '../../containers/ImageContainer';

export default class GraphToggleWithOptions extends Component {
    constructor(props) {
        super(props);
        this.userDataObj = [];
        this.state = {
        };
        this.createQuestionOptions = this.createQuestionOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.radioRef = [];
    }

    selectOption(event) {
        this.userDataObj[0] = event.target.value;
        this.props.validate(this.userDataObj);
    }

    componentDidMount() {
        this.setState({});
        this.props.childRef(this.radioRef);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentPageCount !== this.props.currentPageCount) {
            let radList1 = document.getElementsByName(`group${this.props.currentPageCount}`);
            for (var i = 0; i < radList1.length; i++) {
                (radList1[i].parentElement.classList.length == 1) && (radList1[i].parentElement.classList.remove('disabled-input'));
                if (radList1[i].checked) radList1[i].checked = false;
            }
        }
    }


    createQuestionOptions(event) {
        let table = []
        let editCheckClass
        let disableCheckClass = "";
        let disabledInput = false;
        let user = navigator.userAgent.toLowerCase();
        let isAndroid = user.indexOf("android") > -1;
        for (let i = 0; i < this.props.data.questionData.questionOptions.length; i++) {
            editCheckClass = "";
            if (this.props.editFlag) {
                disableCheckClass = " disabled-input";
                disabledInput = true;
                for (let j = 0; j < this.props.data.questionData.questionAnswers.length; j++) {
                    if (this.props.data.questionData.questionAnswers[j] === this.props.data.questionData.questionOptions[i]) {
                        editCheckClass = " editClass";
                    }
                }
            }
            if (this.props.data.correctAttempts === 0) {
                disableCheckClass = " disabled-input";
                disabledInput = true;
            }

            if (isAndroid) {
                table.push(
                    <div key={i} className="form-check">
                        <label tabIndex="0" className={"radio" + disableCheckClass}>
                            <input ref={radio => { this.radioRef[i] = radio; }} disabled={disabledInput} className={"form-check-input" + editCheckClass} name={"group" + this.props.currentPageCount} type="radio" onClick={this.selectOption} value={this.props.data.questionData.questionOptions[i]} />
                            <span id={`defaultCheck${i}`} className={"radioSelector" + editCheckClass}></span>
                            <span htmlFor={`defaultCheck${i}`}>{this.props.data.questionData.questionOptions[i]}</span>
                        </label>
                    </div>
                )
            } else {
                table.push(
                    <div key={i} className="form-check">
                        <label className={"radio" + disableCheckClass}>
                            <input ref={radio => { this.radioRef[i] = radio; }} disabled={disabledInput} className={"form-check-input" + editCheckClass} name={"group" + this.props.currentPageCount} type="radio" onClick={this.selectOption} value={this.props.data.questionData.questionOptions[i]} />
                            <span id={`defaultCheck${i}`} className={"radioSelector" + editCheckClass}></span>
                            <span htmlFor={`defaultCheck${i}`}>{this.props.data.questionData.questionOptions[i]}</span>
                        </label>
                    </div>
                )
            }
        }
        return table;
    }

    componentDidMount() {
        this.props.childRef(this.radioRef);
    }

    render() {
        this.userDataObj = [];
        return (
            <div className="fillInBlanks">
                <div className="col-row col-no-gutters">
                    <div className="grid-col-md-6 content-left-column hotspot-img">
                        <div className={(this.props.data.bigHotspotImage === true) ? "hotspot-block extraWidth" : "hotspot-block"}>
                            <span className="barHorizontalLabel graph-postion positionx"> {this.props.data.barLabel.xAxis}</span>
                            <span className="barVerticalLabel graph-postion positiony"> {this.props.data.barLabel.yAxis}</span>
                            {this.props.data.imageDetails &&
                                <ImageContainer src={this.props.data.imageDetails[0].path} alt={this.props.data.imageDetails[0].alt} />
                            }
                        </div>
                    </div>
                    <div className="grid-col-md-6 content-right-column">
                        <div className="hotspot-block-right">
                            <form id="form">
                                {this.createQuestionOptions()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

