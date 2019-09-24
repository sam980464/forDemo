import React, { Component } from 'react';
import TemplateContainer from "../containers/TemplateContainer";


class SinglePageSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="grid-col-sm-12 grid-col-md-12 content-center-column">
                <div>
                    <TemplateContainer />
                </div>
            </div>
        )
    }
}

export default SinglePageSection;