import React, { Component } from 'react';

export default class SampleScreen extends Component {
    constructor(props) {
        super(props);
        this.text = "";
    }


    createListingData() {
        let table = []
        for (let i = 0; i < this.props.data.mainFrame.listingData.length; i++) {
            table.push(
                <li key={i}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.data.mainFrame.listingData[i] }} />
                </li>)

        }
        return table;
    }

    render() {
        this.text = "Select the forward arrow to move through the activity.";
        if (this.props.activePage == this.props.totalPage - 1) {
            this.text = "";
        }
        return (
            <div className="SampleScreen">
                <div className="col-row">
                    <div className="videoPlayer grid-col-md-12">
                        {
                            (this.props.data.mainFrame.text !== "" && this.props.data.mainFrame.text !== undefined) &&
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: this.props.data.mainFrame.text }} /></div>
                        }

                        {
                            (this.props.data.mainFrame.listingData !== "" && this.props.data.mainFrame.listingData !== undefined) &&
                            <ul className="pl-20">
                                {this.createListingData()}
                            </ul>
                        }
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p>{this.text}</p>
                    </div>
                </div>
            </div>
        );
    }
}

