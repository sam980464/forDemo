import React, { Component } from 'react';
import ImageContainer from '../../containers/ImageContainer';


export default class GraphToggle extends Component {
    constructor(props) {
        super(props);
        this.userDataObj = [];
        this.state = {
            tapCount: 0
        };
        this.createHotspot = this.createHotspot.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.currentSelection = {};
        this.disableContent = false;
        this.formRef = React.createRef();
        this.hotspotRef = [];
        this.buttonPressedAria = false;
    }
    //Update component state

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentPageCount !== this.props.currentPageCount) {
            let radList1 = document.getElementsByName(`group${this.props.currentPageCount}`);
            for (var i = 0; i < radList1.length; i++) {
                if (radList1[i].checked) radList1[i].checked = false;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tapCount: 0
        })
        this.formRef.current.reset();
        if (nextProps.correctAttempts >= 0) {
            for (let i = 0; i < this.hotspotRef.length; i++) {
                if (this.hotspotRef[i])
                    this.hotspotRef[i].classList.remove("activefocusBtn");
            }
        }
    }
    componentDidMount() {
        this.props.childRef(this.hotspotRef);
    }
    selectOption(event) {
        for (let i = 0; i < this.hotspotRef.length;i++){
            if (this.hotspotRef[i])
            this.hotspotRef[i].setAttribute("aria-pressed",false);
        }
            event.target.setAttribute("aria-pressed", true);
        this.userDataObj[0] = event.target.value;
        for (let i = 0; i < this.hotspotRef.length; i++) {
            if (this.hotspotRef[i])
                this.hotspotRef[i].classList.remove("activefocusBtn");
        }
        event.currentTarget.classList.add("activefocusBtn");
        this.props.validate(this.userDataObj);
        this.setState({
            tapCount: this.state.tapCount + 1,
        })
    }

    createHotspot(hotspotData) {
        let table = []
        let user = navigator.userAgent.toLowerCase();
        let isAndroid = user.indexOf("android") > -1;
        let hotspotAnswers = this.props.data.questionData.questionAnswers;
        let hotspotImageClass;
        let disableCheckClass = "";
        let disabledInput = false;
        for (let i = 0; i < hotspotData.length; i++) {
            this.currentSelection[i] = false;
            hotspotImageClass = "";
            if (this.props.editFlag) {
                disableCheckClass = " disabled-input";
                disabledInput = true;
                if (i == hotspotAnswers) {
                    hotspotImageClass = " editToggleImg"
                }
            }
            if (this.props.data.correctAttempts === 0) {
                disableCheckClass = " disabled-input";
                disabledInput = true;
            }


            if (this.props.data.questionData.bigRightSideImg === true) {
                table.push(
                    <label key={i} className={"hotSpotLabel" + disableCheckClass} style={{ 'position': 'absolute', 'top': hotspotData[i].xAxis + '%', 'left': hotspotData[i].yAxis + '%', 'width': 27 + 'px', 'height': 38 + 'px' }} aria-label={hotspotData[i].label}>
                        <input ref={hotspotBtn => { this.hotspotRef[i] = hotspotBtn }} disabled={disabledInput} id={`pin${i}`} aria-label={hotspotData[i].label} className={"button button-link hotspot-point" + hotspotImageClass} name={"group" + this.props.currentPageCount} type="button" onClick={this.selectOption} value={i} aria-pressed="false" />
                        {/* <span className={"" + hotspotImageClass} id={`pin${i}`} tabIndex="0"></span> */}
                    </label>
                )
            } else {
                table.push(
                    <label key={i} className={"hotSpotLabel" + disableCheckClass} style={{ 'position': 'absolute', 'top': hotspotData[i].xAxis, 'left': hotspotData[i].yAxis, 'width': 27 + 'px', 'height': 38 + 'px' }} aria-label={hotspotData[i].label}>
                        <input ref={hotspotBtn => { this.hotspotRef[i] = hotspotBtn }} disabled={disabledInput} id={`pin${i}`} aria-label={hotspotData[i].label} className={"button button-link hotspot-point" + hotspotImageClass} name={"group" + this.props.currentPageCount} type="button" onClick={this.selectOption} value={i} />
                        {/* <span className={"" + hotspotImageClass} id={`pin${i}`} tabIndex="0"></span> */}
                    </label>
                )
            }
        }
        return table;
    }

    render() {
        let hotspotClass;
        if (this.props.data.bigHotspotImage === true) {
            hotspotClass = "hotspot-block extraWidth"
        } else if (this.props.data.bigHotspotImage === false) {
            hotspotClass = "hotspot-block bigWidth"
        } else {
            hotspotClass = "hotspot-block"
        }
        return (
            <div className="fillInBlanks" aria-label="graph">
                <div className="col-row col-no-gutters">
                    <div className="grid-col-md-12 content-left-column hotspot-img">
                        <div className={hotspotClass}>
                            <form id="form" ref={this.formRef} >
                                <span className="barHorizontalLabel graph-postion positionx">
                                    {this.props.data.barLabel.xAxis}
                                </span>
                                <span className="barVerticalLabel graph-postion positiony">
                                    {this.props.data.barLabel.yAxis}
                                </span>
                                {
                                    this.props.data.imageDetails &&
                                    <ImageContainer tabIndex="0"
                                        src={this.props.data.imageDetails[0].path}
                                        alt={this.props.data.imageDetails[0].alt}
                                    />
                                }
                                {this.createHotspot(this.props.data.questionData.questionOptions)}
                            </form>
                        </div>
                    </div>
                    <div className="grid-col-md-12 content-right-column">
                    </div>
                </div>
            </div>
        );
    }
}

