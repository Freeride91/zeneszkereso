import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/hu';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { setEditPost, deletePost, getPostById } from '../actions/postsActions';
// import { useDispatch } from 'react-redux';
// import { setAlert } from '../actions/alertActions';

const Post = ({
    history,
    auth: { user, isLoading, isAuthenticated },
    post: { _id, author, authorId, title, pers_or_band, instrument, place, description, posted_date },
    deletePost,
    getPostById,
    setEditPost
}) => {
    // const dispatch = useDispatch();

    const editThisPost = () => {
        getPostById(_id);
        setEditPost(true);
        history.push('/zeneszkereso/add_post');
    }

    const moreInfo = () => {
        getPostById(_id);
        history.push('/zeneszkereso/post_details');
    }

    return (
        <div className='hirdetes'>
            <div className="row mb-2">

                <div className="d-flex col-md-1 px-1 align-self-center justify-content-center">
                    {pers_or_band === 'person' ?
                        (<i className="fas fa-user iconUser"></i>) :
                        (<i className="fas fa-users iconUsers"></i>)}
                </div>

                <div className="d-flex col-md-5 pr-0 rightBorder">
                    <div className="align-self-center w-100">

                        <div className="author pr-3 text-center"><i className="fas fa-user" /> <u>{author}</u></div>

                        <h5 className="py-2 pr-3 text-center border-bottom">{title}</h5>

                        <div className="d-flex pr-3 justify-content-between">
                            <div className="place"><i className="fas fa-street-view"></i>&nbsp; {place}</div>
                            <div className="category"> {instrument} </div>
                        </div>

                        <div className="d-flex pr-3 mt-2 justify-content-between">
                            <div className="date"><i className="far fa-calendar-alt"></i>&nbsp; <Moment locale="hu" format="MMMM Do, HH:mm">{posted_date}</Moment></div>
                            <div className="moreinfo">
                                <button className='btn btn-adMore' onClick={moreInfo}>
                                    több info <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>

                        {!isLoading && user && user._id === authorId ?
                            (
                                <div className="d-flex pr-3 mt-1 justify-content-between">
                                    <button className='btn btn-adEdit' onClick={e => { editThisPost(e) }}>
                                        szerkesztés &nbsp; <i className="far fa-edit"></i>
                                    </button>
                                    <button className='btn btn-adDelete' onClick={e =>
                                        deletePost(_id)}>törlés &nbsp; <i className="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            ) : (null)
                        }

                    </div>
                </div>
                <div className="d-flex col-md-6 pl-md-4">
                    <p className="text-justify align-self-center description">

                        {description.substring(0, 270)}

                        {description.length > 270 ?
                            <>
                                <b>... </b>
                            </> : '  '}

                        &nbsp; &nbsp; <Link to="#" onClick={moreInfo} className="text-secondary">
                            <u>tovább</u>&nbsp;<i className="fas fa-chevron-right"></i>
                        </Link>

                        {/* {<button className='btn btn-adMore' onClick={moreInfo}>
                            több info <i className="fas fa-chevron-right"></i>
                        </button>} */}
                    </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, getPostById, setEditPost })(Post);