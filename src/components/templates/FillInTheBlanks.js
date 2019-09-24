import React, { Component } from 'react';

class FillInTheBlanks extends Component {
    constructor(props) {
        super(props);

        this.value1 = [];
        this.value2 = [];
        this.valued = "";
        this.currentDragOption = {};
        this.currentTargetLeft = "";
        this.currentTargetTop = "";
        this.createQuestionOptions = this.createQuestionOptions.bind(this);
        this.createQuestions = this.createQuestions.bind(this);
        this.fillValue = this.fillValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.userDataObj = {};
        let self = this;
        this.userDataObj = {};
    }


    createQuestions(event) {
        let table = []
        let fillDataObj = {
            className: "fill-blanks fill-blanks-min-40",
            data: ""
        }
        for (let i = 0; i < this.props.data.questionData.question.length; i++) {
            fillDataObj.data = this.value2[i]
            if (this.props.editFlag) {
                fillDataObj = {
                    className: "filledData",
                    data: this.props.data.questionData.questionAnswers[i]
                }
            }
            table.push(<span key={i}>
                <span dangerouslySetInnerHTML={{ __html: this.props.data.questionData.question[i] }} />
                {i < this.props.data.questionData.question.length - 1 && !this.props.editFlag &&
                    <span className={fillDataObj.className}
                        id={"drop" + i}
                        data-keyindex={i}
                        onClick={this.getValue.bind(this, i)}>
                        &nbsp;&nbsp;{fillDataObj.data}&nbsp;&nbsp;
                </span>}
                {i < this.props.data.questionData.question.length - 1 && this.props.editFlag &&
                    <span className={fillDataObj.className}
                        id={"drop" + i} >
                        &nbsp;&nbsp;{fillDataObj.data}&nbsp;&nbsp;
                </span>}
            </span>)

        }
        return table;
    }
    createQuestionOptions(event) {
        let table = [];
        let disableCheckClass = "";
        if (this.props.editFlag) {
            disableCheckClass = " disabled-input";
        }
        for (let i = 0; i < this.props.data.questionData.questionOptions.length; i++) {
            table.push(

                <button className={"button button-light" + disableCheckClass} type="button"
                    id={"btn" + i}
                    key={i}
                    onClick={this.fillValue.bind(this, i)}
                    value={this.props.data.questionData.questionOptions[i]}>
                    {this.props.data.questionData.questionOptions[i]}
                </button>

            )
        }
        return table;
    }


    fillValue(i, event) {

        var currentSource = document.getElementById(event.target.id);
        this.valued = document.getElementById(event.target.id).value;
        this.currentDragOption = currentSource;
        this.value1.push(this.valued);
    }

    getValue(i, e) {

        let currentSelection = document.getElementById(e.currentTarget.id);

        let currentData = this.currentDragOption.value;
        if (this.currentDragOption.value === undefined) {
            return;
        }
        if (this.value1.length > this.props.data.questionData.questionAnswers.length) {
            this.value1.pop();
            this.value1[i] = this.valued;
        }
        currentSelection.textContent = currentData;
        let attrIndex = currentSelection.getAttribute('data-keyindex');
        this.userDataObj[attrIndex] = this.currentDragOption.value;
        this.props.onDataSelect(this.userDataObj);
        currentData = currentSelection = "";

    }

    render() {
        return (
            <div className="fillInBlanks">
                <form id="form">
                    <div className="questionData">
                        <p>  {this.createQuestions()}</p>
                    </div>
                    <div className="answer-assets">
                        {this.createQuestionOptions()}
                    </div>
                </form>
            </div>
        );
    }
}

export default FillInTheBlanks;