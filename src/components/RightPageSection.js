import React, { Component } from 'react';
import TemplateContainer from "../containers/TemplateContainer";


class RightPageSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let itextdisable = "";
        this.questionSet = this.props.data[this.props.activePage].rightFrame;
        let header = (this.questionSet.headers) ? this.questionSet.headers[0] : '';
        let templateClass = "grid-col-sm-7 grid-col-md-8 content-right-column";
        if (this.props.data[this.props.activePage].templateType != 'Introduction') {
            itextdisable = <div className="alert alert-warning font-italic" role="alert">
                <div dangerouslySetInnerHTML={{ __html: header }} />
            </div>
        }
        if (this.props.data[this.props.activePage].templateType == 'Introduction' || this.props.data[this.props.activePage].templateType == 'RadioCheckImage') {
            templateClass = "grid-col-sm-12 grid-col-md-12 content-right-column"
        }
        return (
            <div className={templateClass}>
                {itextdisable}
                <div>
                    <TemplateContainer childRef={this.props.childRef} triggerActiveModal={this.props.triggerActiveModal} />
                </div>
            </div>
        )
    }
}

export default RightPageSection;