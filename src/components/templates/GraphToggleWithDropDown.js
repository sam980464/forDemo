import React, { Component } from 'react';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import ImageContainer from '../../containers/ImageContainer';


class GraphToggleWithDropdown extends Component {
    constructor(props) {
        super(props);
        this.userDataObj = [];
        this.state = {
        };
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.singleCreateDropdownOptions = this.singleCreateDropdownOptions.bind(this);
        this.multiCreateDropdownOptions = this.multiCreateDropdownOptions.bind(this);
        this.createOptionsTag = this.createOptionsTag.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.multiDropDownValues = [];
        this.caret_down = <MLIcon
            title="caret down"
            type="caret_down"
            width="10"
            height="9"
            scale={1.2}
            viewBox="0 0 26 26"
            className="icon" />
        this.formRef = React.createRef();
        this.dropDownRef = [];
    }

    componentDidMount() {
        this.setState({});
        this.props.childRef(this.dropDownRef);
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentPageCount !== this.props.currentPageCount) {
            let singleDropList = document.getElementsByName(`singleSelect${this.props.currentPageCount}`);

            if (this.props.data.dropdownData.dropdownDetails.length == 1 && singleDropList[0].classList.length == 1) {
                this[`singleSelect${this.props.currentPageCount}`]['value'] = 'Select';
            }

            if (this.props.data.dropdownData.dropdownDetails.length > 1) {
                this.props.data.dropdownData.dropdownDetails.map((key, val) => {
                    let multiDropList = document.getElementsByName(`multiselect${val}${this.props.currentPageCount}`);
                    (multiDropList[0].classList.length == 1) && (this[`multiselect${val}${this.props.currentPageCount}`]['value'] = 'Select');
                })

            }
        }
    }
    componentWillReceiveProps(newProps) {
        this.formRef.current.reset();
    }

    createOptionsTag(optoinsData, answerData) {
        let data = [];
        for (let i = 0; i < optoinsData.length; i++) {
            data.push(
                <option key={i} value={optoinsData[i]}>{optoinsData[i]}</option>
            )
        }
        return data;
    }

    singleCreateDropdownOptions(dropdownData) {
        let dropDownDetail = [];
        let editOptionData;
        let disableCheckClass = "";
        let disabledInput = false;
        if (this.props.editFlag) {
            editOptionData = dropdownData[0]['dropdownAnswers'];
            disableCheckClass = " disabled-input";
            disabledInput = true;
        }
        if (this.props.data.correctAttempts === 0) {
            disableCheckClass = " disabled-input";
            disabledInput = true;
        }
        dropDownDetail.push(
            <div key={dropdownData[0].dropdownLabel} className="form-group col-row">
                {(dropdownData[0].dropdownLabel !== "" && dropdownData[0].dropdownLabel !== undefined) &&
                    <label className="grid-col-sm-12 col-form-label marginBottom">
                        <div dangerouslySetInnerHTML={{ __html: this.props.data.dropdownData.dropdownQuestion }} />
                    </label>}
                <div className="grid-col-sm-12">
                    <div className={(this.props.data.dropdownData.longDropdown === true) ? "dropdown boxed longDropdown" : "dropdown boxed"}>
                        <select disabled={disabledInput} className={"button" + disableCheckClass} key={dropdownData[0].dropdownLabel} ref={(select) => { this.dropDownRef[0] = select; }} name={`singleSelect${this.props.currentPageCount}`} onChange={(evt) => this.selectOption(0, evt)} value={editOptionData} aria-label="drop down list" >
                            <option value="Select">Select...</option>
                            {this.createOptionsTag(dropdownData[0]['dropdownOptions'], dropdownData[0]['dropdownAnswers'])}
                        </select>
                        <span className="dropDownCaret" aria-hidden="true">
                            {this.caret_down}
                        </span>
                    </div>
                </div>
            </div>
        )

        return dropDownDetail;
    }


    multiCreateDropdownOptions(dropdownData) {

        let dropDownDetail = [];
        let disableCheckClass = "";
        let disabledInput = false;
        for (let i = 0; i < dropdownData.length; i++) {

            let editOptionData;
            if (this.props.editFlag) {
                editOptionData = dropdownData[i]['dropdownAnswers'];
                disableCheckClass = " disabled-input";
                disabledInput = true;
            }
            if (this.props.data.correctAttempts === 0) {
                disableCheckClass = " disabled-input";
                disabledInput = true;
            }
            dropDownDetail.push(
                <div key={i} className="form-group col-row col-no-gutters marginBottom" style={{ 'alignItems': 'center' }}>
                    {(dropdownData[i].dropdownLabel !== "" && dropdownData[i].dropdownLabel !== undefined) &&
                        <label className="lableText col-form-label">
                            <span dangerouslySetInnerHTML={{ __html: this.props.data.dropdownData.dropdownDetails[i].dropdownLabel }} />
                        </label>}

                    <div className="">
                        <div className="dropdown boxed">
                            <select disabled={disabledInput} className={"button" + disableCheckClass} key={dropdownData[i].dropdownLabel} ref={(select) => { this.dropDownRef[i] = select; }} name={"multiselect" + i + this.props.currentPageCount} id={`mul${i}`} onChange={(evt) => this.selectOption(i, evt)} value={editOptionData} aria-label="drop down list" >
                                <option value="Select">Select...</option>
                                {this.createOptionsTag(dropdownData[i]['dropdownOptions'], dropdownData[i]['dropdownAnswers'])}
                            </select>
                            <span className="dropDownCaret" aria-hidden="true">
                                {this.caret_down}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }

        return dropDownDetail;
    }



    createDropdownOptions(dropdownData) {
        if (dropdownData.length > 1) {
            return this.multiCreateDropdownOptions(dropdownData)
        }
        else {
            return this.singleCreateDropdownOptions(dropdownData)
        }

    }

    selectOption(currentIndex, event) {
		/*let selecteVal = event.target.value;
        this.userDataObj[currentIndex] = selecteVal;
		if (selecteVal == 'Select' && currentIndex == 0 ) {
            this.userDataObj[currentIndex] = null;
        }else if(selecteVal == 'Select') {
			 this.userDataObj.splice(currentIndex,1);
		}*/
		let dataArr = [];
		for(let i=0 ;i < this.dropDownRef.length;i++){
			if(this.dropDownRef[i]){
			  this.userDataObj[i] = this.dropDownRef[i].value;
			}	
		}
		dataArr = this.userDataObj.filter((item,index)=>{
			 return (item != 'Select');
		})
        this.props.validate(dataArr);
		
        if ((this.multiDropDownValues[0] !== undefined) && (this.props.data.dropdownData.dropdownDetails.length === this.multiDropDownValues.length)) {
            this.multiDropDownValues = [];
        }
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
                            <form id="form" ref={this.formRef}>
                                <div className="col-row col-no-gutters">{this.createDropdownOptions(this.props.data.dropdownData.dropdownDetails)}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default GraphToggleWithDropdown;