import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import LeftPageSetContainer from '../containers/LeftPageSetContainer';
import RightPageSetContainer from '../containers/RightPageSetContainer';
import SinglePageSetContainer from '../containers/SinglePageSetContainer';
import LazyLoad from './LazyLoad';
import Validate from './Validate';
import ReactGA from '../analytics';
class PrimerWrapper extends Component {
    constructor(props) {
        super(props);
        this.props.loadPrimer();
        this.state = {
            controlRef: null,
            nextBtnRef: null
        }

        this.mainContainerRef = React.createRef();
    }

    getRefsFromChild = (childRef) => {

        this.setState({
            controlRef: childRef
        })
    }

    getNextBtnRef = (nextRef) => {
        this.setState({
            nextBtnRef: nextRef
        })
    }

    focusControl = () => {
        this.state.controlRef[0].focus();
        // this.state.controlRef[0].click();
    }

    nextFocus = () => {
        setTimeout(() => {
            this.state.nextBtnRef.current.focus();
        }, 100)
    }

    triggerActiveModal = (cond) => {
        if (cond == undefined) cond = false;
        this.mainContainerRef.current.setAttribute('aria-hidden', cond);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.activePage != nextProps.activePage) {
            ReactGA.ga('send', 'event', 'function', 'run', `page "${nextProps.activePage}" has been viewed`);
        }

    }

    render() {
        this.activePage = (this.props.data.activePage) ? this.props.data.activePage : 0;
        this.questionSet = this.props.data.questionSet[this.activePage];
        let showModal = this.props.showAnswerModal;
        return (
            <section className="content" aria-hidden="false" ref={this.mainContainerRef}>
                <Header triggerActiveModal={this.triggerActiveModal} activePage={this.activePage} resetClick={this.props.resetStartOver} data={this.props.data.primerInfo}></Header>
                <div className="main-container" id="mainContainer"  >
                    <main>
                        <div className="content-wrapper">
                            <div className="col-row">
                                {this.questionSet.templateType != 'Introduction' && <div className="grid-col-md-12 leftHeader">
                                    <h2>
                                        <span dangerouslySetInnerHTML={{ __html: this.questionSet.templateHeading[0] }} />
                                    </h2>
                                    {(this.questionSet.templateHeading[1] !== "" && this.questionSet.templateHeading[1] != null) &&
                                        <div>
                                            <span dangerouslySetInnerHTML={{ __html: this.questionSet.templateHeading[1] }} />
                                        </div>
                                    }
                                </div>
                                }
                                {/* Left Page Container */}
                                {this.questionSet.templateType != 'Introduction' && this.questionSet.templateType != 'RadioCheckImage' && this.questionSet.leftFrame &&
                                    <LeftPageSetContainer triggerActiveModal={this.triggerActiveModal} />
                                }
                                {/* Right Page Set Container */}
                                {
                                    this.questionSet.rightFrame && this.questionSet.singleQuestionSet === false &&
                                    <RightPageSetContainer childRef={this.getRefsFromChild} triggerActiveModal={this.triggerActiveModal} />
                                }
                                {/* Single Page Set Container */}
                                {
                                    this.questionSet.sampleTemplate === 'sampleData' &&
                                    <SinglePageSetContainer />
                                }
                            </div>
                            {
                                this.questionSet.showValidateButtons === true &&
                                <Validate
                                    showModal={showModal}
                                    correctAttempts={this.props.correctAttempts}
                                    checkAnswerButtonState={this.props.checkAnswerButtonState}
                                    data={this.props.data.questionSet}
                                    editFlag={this.props.editMode}
                                    autoShowAnswer={this.props.autoShowAnswer}
                                    checkAnswer={this.props.checkAnswer}
                                    activePage={this.props.data.activePage}
                                    setCorrectFlag={this.props.setCorrectFlag}
                                    nextPress={this.props.nextPress}
                                    focusControl={this.focusControl}
                                    nextFocus={this.nextFocus}
                                    triggerActiveModal={this.triggerActiveModal}
                                />
                            }

                        </div>
                    </main>
                </div>
                <Footer
                    data={this.props.data.questionSet}
                    currentPage={this.props.data.activePage}
                    next={this.props.nextPage}
                    prev={this.props.prevPage}
                    nextBtnRef={this.getNextBtnRef}
                />
                <LazyLoad data={this.props.data} />

            </section>
        )
    }
}

PrimerWrapper.propTypes = {
    data: PropTypes.object.isRequired,
    activePage: PropTypes.number,
    currentPageCount: PropTypes.number.isRequired,
    checkAnswerButtonState: PropTypes.number,
    editMode: PropTypes.bool,
    checkAnswer: PropTypes.bool,
    showAnswerModal: PropTypes.bool,
    correctAttempts: PropTypes.number,
    loadPrimer: PropTypes.func.isRequired,
    resetStartOver: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    autoShowAnswer: PropTypes.func.isRequired,
    setCorrectFlag: PropTypes.func.isRequired
}


export default PrimerWrapper;