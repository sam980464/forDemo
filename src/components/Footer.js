import React, { Component } from 'react';
import MLIcon from '@macmillan-learning/ml-react-cdl-icons';
import PropTypes from 'prop-types';
import ReactGA from '../analytics';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.prevBtn = React.createRef();
        this.nextBtn = React.createRef();
    }

    nextPage = () => {
        this.props.next();
        ReactGA.ga('send', 'event', 'click', 'button', `"next" has been clicked on page "${this.props.currentPage}"`);
        if ((this.props.currentPage + 1) == this.props.data.length - 1) {
            ReactGA.ga('send', 'event', 'function', 'run', `page all pages have been viewed`);
        }
    }

    prevPage = () => {
        this.props.prev();
        ReactGA.ga('send', 'event', 'click', 'button', `"prev" has been clicked on page "${this.props.currentPage}"`);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data[nextProps.currentPage].editMode == true) {
            this.nextBtn.current.focus();
        }
    }

    componentDidMount() {
        this.props.nextBtnRef(this.nextBtn);
    }
    render() {
        const rightArrow = <MLIcon
            type="chevron_right"
            width="20"
            height="26"
            scale={1.2}
            viewBox="0 0 24 26"
            className="icon" />
        const leftArrow = <MLIcon
            type="chevron_left"
            width="20"
            height="26"
            scale={1.2}
            viewBox="0 0 24 26"
            className="icon" />
        let currentPage = this.props.currentPage;
        let totalPage = this.props.data.length - 1;
        let disableClass = "disabled-link";
        let conditionalNext = "";
        let conditionalPrev = "";
        if (currentPage == 0) {
            conditionalPrev = <button aria-label="Previous" tabIndex="0" ref={this.prevBtn} id="prev" role="button" disabled="disabled" className={'footerArrow ' + disableClass} onClick={() => this.prevPage()}><span aria-hidden="true">{leftArrow}</span></button>
        } else {
            conditionalPrev = <button aria-label="Previous" tabIndex="0" ref={this.prevBtn} id="prev" role="button" className={'footerArrow'} onClick={() => this.prevPage()}><span aria-hidden="true">{leftArrow}</span></button>
        }
        //if (currentPage == totalPage || this.props.data[currentPage].editMode == false) {
        if (currentPage == totalPage) {
            conditionalNext = <button aria-label="Next" tabIndex="0" ref={this.nextBtn} id="next" role="button" disabled="disabled" className={'footerArrow ' + disableClass} onClick={() => this.nextPage()}><span aria-hidden="true">{rightArrow}</span></button>
        } else {
            conditionalNext = <button aria-label="Next" tabIndex="0" ref={this.nextBtn} id="next" role="button" className={'footerArrow'} onClick={() => this.nextPage()}><span aria-hidden="true">{rightArrow}</span></button>

        }

        return (
            <footer className="footer">
                <div className="main-container text-center d-none">
                    <button className="button button-primary" type="submit">Start</button>
                </div>
                <div className="main-container text-right">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end mb-0">
                            <li className="page-item page-item-prev">
                                {conditionalPrev}
                            </li>
                            <li className="page-item">
                                Page
                                 {` ${currentPage} `}
                                of
                                 {` ${totalPage}`}
                            </li>
                            <li className="page-item page-item-next" >
                                {conditionalNext}
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = {
    data: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

export default Footer;
