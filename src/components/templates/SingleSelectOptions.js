import React, { Component } from 'react';

export default class SingleSelectOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectedData: []
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.onclick = this.onclick.bind(this);
        this.userSelectedData = [];
        this.successFlag = false;
        this.disableContent = false;
        this.userDataObj = [];
        this.formRef = React.createRef();
        this.radioRef = [];

    }

    componentWillMount() {
        var radList = document.getElementsByName(`group${this.props.currentPageCount}`);
        for (var i = 0; i < radList.length; i++) {
            if (radList[i].checked) radList[i].checked = false;
        }
    }


    createQuestions = () => {
        let table = [];
        for (let i = 0; i < this.props.data.questionData.question.length; i++) {
            table.push(<span>
                {this.props.data.questionData.question[i]} <span className="fill-blanks fill-blanks-min-40"></span>
            </span>)
        }
        return table;
    }

    componentWillReceiveProps(newProps) {
        this.formRef.current.reset();
    }

    createQuestionOptions(event) {
        let table = [];
        let editCheckClass;
        let disableCheckClass = "";
        let disabledInput = false;
        let user = navigator.userAgent.toLowerCase();
        let isAndroid = user.indexOf("android") > -1;
        if (this.props.editFlag || this.disableContent) {
            disableCheckClass = " disabled-input";
            disabledInput = true;
        }
        for (let i = 0; i < this.props.data.questionData.questionOptions.length; i++) {
            editCheckClass = "";
            if (this.props.editFlag) {
                for (let j = 0; j < this.props.data.questionData.questionAnswers.length; j++) {
                    if (this.props.data.questionData.questionAnswers[j] === this.props.data.questionData.questionOptions[i]) {
                        editCheckClass = " editClass";
                    }
                }
            }
            if (isAndroid) {
                table.push(
                    <div key={i} className="form-check">
                        <label tabIndex="0" className={"radio" + disableCheckClass}>
                            <input ref={radio => { this.radioRef[i] = radio; }} disabled={disabledInput} className={"form-check-input" + editCheckClass} name={"group" + this.props.currentPageCount} aria-selected="false" type="radio" onChange={this.selectOption} value={this.props.data.questionData.questionOptions[i]} />
                            <span id={`abc${i}`} className={"radioSelector" + editCheckClass}></span>
                            <span htmlFor={`abc${i}`}>
                                <span className="innerSpan" dangerouslySetInnerHTML={{ __html: this.props.data.questionData.questionOptions[i] }} />
                            </span>
                        </label>
                    </div>
                )
            } else {
                table.push(
                    <div key={i} className="form-check">
                        <label className={"radio" + disableCheckClass}>
                            <input ref={radio => { this.radioRef[i] = radio; }} disabled={disabledInput} className={"form-check-input" + editCheckClass} name={"group" + this.props.currentPageCount} aria-selected="false" type="radio" onClick={this.selectOption} value={this.props.data.questionData.questionOptions[i]} />
                            <span id={`abc${i}`} className={"radioSelector" + editCheckClass}></span>
                            <span htmlFor={`abc${i}`}>
                                <span className="innerSpan" dangerouslySetInnerHTML={{ __html: this.props.data.questionData.questionOptions[i] }} />
                            </span>
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


    selectOption(event) {
        this.userDataObj[0] = event.target.value;
        this.props.validate(this.userDataObj);
        this.userDataObj = [];

    }

    onclick(event) {
        for (let i = 0; i < this.props.data.questionData.questionAnswers.length; i++) {
            for (let j = 0; j < this.userSelectedData.length; j++) {
                if (this.userSelectedData[j] == this.props.data.questionData.questionAnswers[i]) {
                    this.successFlag = true;
                    return;
                }
            }
        }
    }

    render() {
        return (
            <div className="fillInBlanks">
                <div className="rightDataBlock">
                    <div className="questionData">
                        <p>  {this.createQuestions()}</p>
                    </div>
                    <div className="answer-assets">
                        <form id="form" ref={this.formRef}>
                            {this.createQuestionOptions()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

