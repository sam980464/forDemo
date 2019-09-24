import React, { Component } from 'react';
import RadioCheckImage from './templates/RadioCheckImage';
export default class SingleQuestionSetContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const styleSheet = {
            width: "100%"
        }
        let itextdisable = "";
        if (!this.props.editFlag) {
            itextdisable = <div className="alert alert-warning font-italic" role="alert">
                <div dangerouslySetInnerHTML={{ __html: this.props.data.headers }} />
            </div>
        }
        return (


            <div className="col-row">
                <div className="grid-col-12">
                    {itextdisable}
                </div>
                <RadioCheckImage selectedObjectGraph={this.props.selectedDataOption} currentPageCount={this.props.currentPageCount} clearSelectedDataOption={this.props.clearSelectedDataOption} editFlag={this.props.editFlag} onDataSelect={this.props.onDataSelect} data={this.props.data.rightFrame} />
            </div>

        );
    }
}
