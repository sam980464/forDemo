import React, { Component } from 'react';
import IntroductionPage from './templates/Introduction';
import FillInTheBlanks from './templates/FillInTheBlanks';
import DragNDrop from './templates/DragnDrop';
import DropDownMenu from './templates/DropDownMenu';
import DropDownMultiple from './templates/DropDownMultiple';
import SingleSelectOptions from './templates/SingleSelectOptions';
import MultiSelectOptions from './templates/MultiSelectOptions';
import GraphToggle from './templates/GraphToggle';
import GraphToggleWithOptions from './templates/GraphToggleWithOptions';
import GraphToggleWithDropdown from './templates/GraphToggleWithDropDown';
import RadioCheckImage from './templates/RadioCheckImage';
import SampleScreen from './templates/SampleScreen';
import VideoScreen from './templates/VideoScreen';
class TemplateSelect extends Component {
    constructor(props) {
        super(props);
    }
    renderTemplate() {
        let propsObj = {
            activePage: this.props.activePage,
            validate: this.props.dataValidate,
            editFlag: this.props.editMode,
            data: this.props.data.rightFrame,
            totalPage: this.props.totalPages,
            correctAttempts: this.props.correctAttempts,
            childRef: this.props.childRef,
            triggerActiveModal:this.props.triggerActiveModal
        }
        let templateType = (this.props.data.hasOwnProperty('templateType')) ? this.props.data.templateType : this.props.data.rightFrame.templateType;
        switch (templateType) {
            case 'Introduction':
                propsObj.data = this.props.data;
                return <IntroductionPage {...propsObj} />;
            case 'fillInTheBlanks':
                return <FillInTheBlanks  {...propsObj} />;
            case 'SingleSelectOptions':
                return <SingleSelectOptions {...propsObj} />;
            case 'MultiSelectOptions':
                return <MultiSelectOptions {...propsObj} />;
            case 'GraphToggle':
                return <GraphToggle {...propsObj} />;
            case 'GraphToggleWithOptions':
                return <GraphToggleWithOptions {...propsObj} />;
            case 'GraphToggleWithDropdown':
                return <GraphToggleWithDropdown {...propsObj} />;
            case 'DropDownMenu':
                return <DropDownMenu {...propsObj} />;
            case 'DropDownMultiple':
                return <DropDownMultiple {...propsObj} />;
            case 'dragAndDrop':
                return <DragNDrop {...propsObj} />;
            case 'RadioCheckImage':
                return <RadioCheckImage {...propsObj} />;
            case 'SampleScreen':
                propsObj.data = this.props.data;
                return <SampleScreen {...propsObj} />;
            case 'VideoScreen':
                propsObj.data = this.props.data;
                return <VideoScreen {...propsObj} />;
        }
    }

    render() {
        return (
            <div>
                {this.renderTemplate()}
            </div>
        )
    }
}

export default TemplateSelect;
