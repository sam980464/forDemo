import React, { Component } from 'react';

export default class MultiSelectOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectedData: []
        };
        this.createQuestionOptions = this.createQuestionOptions.bind(this);
        this.createQuestions = this.createQuestions.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.onclick = this.onclick.bind(this);
        this.userSelectedData = [];
        this.successFlag = false;
        this.pop = false;
        this.disableContent = false;
        this.formRef = React.createRef();
        this.checkBoxRef = [];

    }

    componentDidMount() {
        this.props.childRef(this.checkBoxRef);
    }

    componentWillReceiveProps(nextProps) {
        this.formRef.current.reset();
        this.userSelectedData = [];

    }

    createQuestions(event) {
        let table = []
        for (let i = 0; i < this.props.data.questionData.question.length; i++) {
            table.push(<span key={i}>
                {this.props.data.questionData.question[i]} <span className="fill-blanks fill-blanks-min-40"></span>
            </span>)
        }
        return table;
    }
    createQuestionOptions(event) {
        let table = []
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
            var tabindex = "";
            var role = "";
            if (isAndroid) {
                tabindex = 0;
                role = "checkbox";
            }
            table.push(
                <div key={i} className="form-check">
                    <label tabIndex={tabindex} className={"checkbox" + disableCheckClass} role={role}>
                        <input ref={checkbox => { this.checkBoxRef[i] = checkbox }} disabled={disabledInput} className={"form-check-input" + editCheckClass} type="checkbox" name={`check${this.props.currentPageCount}`} aria-selected="false" onClick={this.selectOption} value={this.props.data.questionData.questionOptions[i]} id={`${this.props.currentPageCount}${i}`} />
                        <span className={"checkboxSelector" + editCheckClass}></span>
                        <span htmlFor={`${this.props.data.templateType}${i}`}>
                            <span className="innerSpan" dangerouslySetInnerHTML={{ __html: this.props.data.questionData.questionOptions[i] }} /></span>
                    </label>
                </div>
            )

        }

        return table;
    }

    selectOption(event) {
        let index = this.userSelectedData.indexOf(event.target.value);
        if (index == -1) {
            this.userSelectedData.push(event.target.value);
            event.target.attributes['aria-selected'].value = "true";
        }
        if (!event.target.checked) {
            this.userSelectedData.splice(this.userSelectedData.indexOf(event.target.value), 1);
        }
        this.props.validate(this.userSelectedData);
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
                    <form id="form" ref={this.formRef}>
                        <div className="questionData">
                            <p>  {this.createQuestions()}</p>
                        </div>
                        <div className="answer-assets">
                            {this.createQuestionOptions()}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

