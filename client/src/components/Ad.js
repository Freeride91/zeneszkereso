import React from 'react';
// import { Link } from 'react-router-dom';
import 'moment/locale/hu';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {editAd, deleteAd, getAdById } from '../actions/adsActions';

const Ad = ({
    history,
    auth: { user, isLoading, isAuthenticated },
    ad: { _id, author, authorId, title, pers_or_band, instrument, place, description, posted_date },
    deleteAd,
    getAdById,
    editAd
}) => {

    const editThisAd = () => {
        getAdById(_id);
        editAd();
        history.push('/zeneszkereso/add_ad');
    }

    return (
        <div className='hirdetes'>
            <div className="row mb-2">
                <div className="col-md-1 px-1 d-flex align-self-center justify-content-center">
                    {pers_or_band === 'person' ?
                        (<i className="fas fa-user iconUsers"></i>) :
                        (<i className="fas fa-users iconUsers"></i>)}
                </div>
                <div className="col-md-5 border-right pr-0 d-flex">
                    <div className="align-self-center w-100">

                        <div className="author  pb-3"><i className="fas fa-user" /> <u>{author}</u></div>

                        <h5 className="border-bottom py-2 pr-3">{title}</h5>

                        <div className="pr-3 d-flex justify-content-between">
                            <div className="place"><i className="fas fa-street-view"></i>&nbsp; {place}</div>
                            <div className="category"> {instrument} </div>
                        </div>

                        <div className="pr-3 mt-2 d-flex justify-content-between">
                            <div className="date"><i className="far fa-calendar-alt"></i>&nbsp; <Moment locale="hu" format="MMMM Do, HH:mm">{posted_date}</Moment></div>
                            {/* <div className="moreinfo">
                                <button className='btn btn-adMore'>
                                    tovább <i className="fas fa-chevron-right"></i>
                                </button>
                            </div> */}
                        </div>
                        {/*  */}
                        {!isLoading && user && user._id === authorId ? (
                            <div className="pr-3 mt-1">
                                <button className='btn btn-adEdit mr-1' onClick={e => { editThisAd(e) }}>
                                    szerkesztés &nbsp; <i className="far fa-edit"></i>
                                </button>
                                <button className='btn btn-adDelete' onClick={e =>
                                    deleteAd(_id)}>törlés &nbsp; <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        ) : (
                                null
                            )}

                    </div>
                </div>
                <div className="col-md-6 d-flex">
                    <p className="text-secondary text-justify align-self-center">{description} </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteAd, getAdById, editAd })(Ad);