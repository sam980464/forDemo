import React, { Component } from 'react';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
class DropDownMenu extends Component {
    constructor(props) {
        super(props);
        this.selectedAnswer = [];
        this.value1 = [];
        this.value2 = [];
        this.valued = "";
        this.currentDragOption = {};
        this.currentTargetLeft = "";
        this.currentTargetTop = "";
        this.createQuestionOptions = this.createQuestionOptions.bind(this);
        this.createOptionData = this.createOptionData.bind(this);
        this.fillValue = this.fillValue.bind(this);
        this.userDataObj = [];
        this.disableContent = false;
        this.caret_down = <MLIcon
            title="caret down"
            fill="#383838"
            type="caret_down"
            width="10"
            height="9"
            scale={1.2}
            viewBox="0 0 26 26"
            className="icon" />
        this.dropDownRef = [];
    }

    componentDidMount() {
        this.props.childRef(this.dropDownRef);
    }

    createQuestions = () => {
        let table = [];
        let disableDropdownClass = "";
        let disabledInput = false;
        let fillDataObj = {
            className: "",
            data: ""
        }
        const box_width = {
            width: '200px'
        }

        if (this.disableContent) {
            disableDropdownClass = "";
            (this.props.data.correctAttempts <= 0) && (disableDropdownClass = " disabled-input");
        } else {
            disableDropdownClass = " disabled-input";
            disabledInput = true;
        }
        for (let i = 0; i < this.props.data.questionData.question.length; i++) {
            fillDataObj.data = this.value2[i]
            if (this.props.editFlag) {
                fillDataObj = {
                    className: "filledData",
                    data: this.props.data.questionData.questionAnswers[i]
                }
            }
            table.push(
                <span key={i} >
                    <span dangerouslySetInnerHTML={{ __html: this.props.data.questionData.question[i] }} />
                    {
                        i < this.props.data.questionData.question.length - 1 && !this.props.editFlag &&
                        <span className={fillDataObj.className}
                            id={"drop" + i}
                            data-keyindex={i} >
                            {this.createQuestionOptions(i)}
                        </span>
                    }
                    {
                        i < this.props.data.questionData.question.length - 1 && this.props.editFlag &&
                        <span key={i} className={fillDataObj.className}
                            id={"drop" + i} >
                            <div className="dropdown boxed">
                                <select id={"dropdown" + i} disabled={disabledInput} aria-label={`drop down list${i}`} key={i} className={"button button-light " + disableDropdownClass}>
                                    <option key={i} value={fillDataObj.data}>{fillDataObj.data}</option>
                                </select>
                                <span className="dropDownCaret" aria-hidden="true">
                                    {this.caret_down}
                                </span>
                            </div>
                        </span>
                    }
                </span>
            )
        }
        return table;
    }
    createOptionData() {
        let optionArray = [];
        for (let i = 0; i < this.props.data.questionData.questionOptions.length; i++) {
            optionArray.push(
                <option key={i} id={i} value={this.props.data.questionData.questionOptions[i]}>{this.convertUnicode(this.props.data.questionData.questionOptions[i])}</option>
            )
        }
        return optionArray;
    }
    convertUnicode(input) {
        return input.replace(/\\u(\w\w\w\w)/g, function (a, b) {
            var charcode = parseInt(b, 16);
            return String.fromCharCode(charcode);
        });
    }

    createQuestionOptions = (i) => {
        let table = [];
        let disableCheckClass = "";
        if (this.props.editFlag || this.disableContent) {
            disableCheckClass = " disabled-input";
        }

        table.push(
            <div key={i} className="dropdown boxed">
                <label htmlFor={"dropdown_" + i}></label>
                <select id={"dropdown_" + i} ref={(select) => { this.dropDownRef[i] = select; }} aria-label={this.props.data.questionData.questionAriaLabel[i]} key={i} className={"button" + disableCheckClass} name={"selectVal" + i} onChange={(evt) => this.fillValue(i, evt)} >
                    {this.createOptionData()}
                </select>
                <span className="dropDownCaret" aria-hidden="true">
                    {this.caret_down}
                </span>
            </div>
        )
        return table;
    }

    fillValue = (i, event) => {
      
		let dataArr = [];
		for(let i=0 ;i < this.dropDownRef.length;i++){
			if(this.dropDownRef[i]){
				 this.userDataObj[i] = this.dropDownRef[i].value;
			}	
		}
		dataArr = this.userDataObj.filter((item,index)=>{
			 return (item != '--select--');
		})
		 this.props.validate(dataArr);
    }

    render() {

        this.userDataObj = [];
        return (
            <div className="dropDownMenu">
                <div className="questionData">
                    <form id="form">
                        <div> {this.createQuestions()}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DropDownMenu;

