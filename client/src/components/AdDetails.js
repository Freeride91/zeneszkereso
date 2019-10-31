import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './layout/Spinner';

import PropTypes from 'prop-types';
import 'moment/locale/hu';
import Moment from 'react-moment';

import { connect } from 'react-redux'
import { getAdById } from '../actions/adsActions';

const AdDetails = ({
    history,
    getAdById,
    ads: { ad, loading }
}) => {

    // useEffect(() => {
    //     getAdById('5db9a00f6772465e6bffe5f4');
    // }, [])

    return loading || ad === null ? <Spinner /> :
        <>
            <div className="py-2">
                <Link onClick={history.goBack} className="text-secondary">
                    <i className="fas fa-chevron-left"></i>  <b>vissza a hirdetésekhez</b>
                </Link>
            </div>


            <div className='hirdetes'>

                <div className="p-1 mb-2 text-center">
                    {ad.pers_or_band === 'person' ?
                        (<i className="fas fa-user iconUser"></i>) :
                        (<i className="fas fa-users iconUsers"></i>)}
                </div>

                <div className="d-flex">
                    <div className="w-100">

                        <div className="author mb-2 text-center"><i className="fas fa-user" /> <u>{ad.author}</u></div>

                        <h5 className="py-2 text-center border-bottom">{ad.title}</h5>

                        <div className="pr-3 d-flex justify-content-between">
                            <div className="place"><i className="fas fa-street-view"></i>&nbsp; {ad.place}</div>
                            <div className="category"> {ad.instrument} </div>
                        </div>

                        <div className="pr-3 mt-2 d-flex justify-content-between">
                            <div className="date">
                                <i className="far fa-calendar-alt"></i>&nbsp;&nbsp;
                                <Moment locale="hu" format="MMMM Do, HH:mm">{ad.posted_date}</Moment>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex">
                    <p className="text-justify description mt-2">
                        {ad.description}
                    </p>
                </div>

                <hr/>

                <div className="d-flex justify-content-end kapcsolatDetails">
                    <span className="ml-4 text-secondary">Kapcsolat:</span>
                    <span className="ml-4"><i className="far fa-envelope"></i> {ad.email ? ad.email : '-'}</span>
                    <span className="ml-4"><i className="fas fa-mobile-alt"></i> {ad.phoneNum ? ad.phoneNum : '-'}</span>
                </div>


            </div>
        </>
}

AdDetails.propTypes = {

}

const mapStateToProps = state => ({
    ads: state.ads
})

export default connect(mapStateToProps, { getAdById })(AdDetails)
