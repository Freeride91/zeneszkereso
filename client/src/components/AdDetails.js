import React from 'react';
// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './layout/Spinner';
import CustomAlert from './layout/CustomAlert';

import 'moment/locale/hu';
import Moment from 'react-moment';

import { connect } from 'react-redux'
import { setEditAd, deleteAd, getAdById } from '../actions/adsActions';

const AdDetails = ({
    history,
    getAdById,
    setEditAd,
    deleteAd,
    ads: { ad, loading },
    auth: { user, isLoading }
}) => {

    // useEffect(() => {
    //     // getAdById('5db9a00f6772465e6bffe5f4');
    // }, [])

    const editThisAd = () => {
        getAdById(ad._id);
        setEditAd(true);
        history.push('/zeneszkereso/add_ad');
    }

    const deleteThisAd = () => {
        deleteAd(ad._id);
        history.push('/zeneszkereso/');
    }

    return loading || ad === null ? <Spinner /> :
        <>
            <div className="controlMaxWidth1200">
                <div className="py-2">
                    <Link to="/zeneszkereso/" className="text-secondary">
                        <i className="fas fa-chevron-left"></i>  <b>Hirdetések</b>
                    </Link>
                </div>


                <CustomAlert />
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

                    <hr />

                    <div className="d-md-flex justify-content-end kapcsolatDetails">
                        <div className="text-secondary hide-sm">Kapcsolat:</div>
                        <span className="ml-4"><i className="far fa-envelope"></i> {ad.email ? ad.email : '-'}</span>
                        <span className="ml-4"><i className="fas fa-mobile-alt"></i> {ad.phoneNum ? ad.phoneNum : '-'}</span>
                    </div>



                    {!isLoading && user && user._id === ad.authorId ?
                        (<>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <button className='btn btn-adEdit mr-1' onClick={e => { editThisAd(e) }}>
                                    szerkesztés &nbsp; <i className="far fa-edit"></i>
                                </button>
                                <button className='btn btn-adDelete' onClick={e => deleteThisAd(e)}>
                                    törlés &nbsp; <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </>
                        ) : (null)
                    }
                </div>

                <div className="tr-footer">&nbsp;</div>
            </div>
        </>
}


const mapStateToProps = state => ({
    ads: state.ads,
    auth: state.auth
})

export default connect(mapStateToProps, { getAdById, setEditAd, deleteAd })(AdDetails)
