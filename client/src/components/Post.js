import React from "react";
import { Link } from "react-router-dom";
import "moment/locale/hu";
import Moment from "react-moment";
import { connect } from "react-redux";
import { setEditPost, deletePost, getPostById } from "../actions/postsActions";
// import { useDispatch } from 'react-redux';
// import { setAlert } from '../actions/alertActions';

const Post = ({
    history,
    auth: { user, isLoading, isAuthenticated },
    post: { _id, author, authorId, title, pers_or_band, instrument, place, description, posted_date },
    deletePost,
    getPostById,
    setEditPost,
}) => {
    // const dispatch = useDispatch();

    const editThisPost = () => {
        getPostById(_id);
        setEditPost(true);
        history.push("/zeneszkereso/add_post");
    };

    const moreInfo = () => {
        getPostById(_id);
        history.push("/zeneszkereso/post_details");
    };

    return (
        <div className="hirdetes">
            <div className="row mb-2 pb-2 border-bottom">
                {/* <div className="d-flex col-md-2 justify-content-center align-items-center px-0">
                        {pers_or_band === "person" ? <i className="fas fa-user iconUser"></i> : <i className="fas fa-users iconUsers"></i>}
                    </div> */}

                <div className="d-flex col-md-12">
                    <div style={{ width: "100%" }}>
                        <div className="align-self-center w-100">
                            <div className="author text-center mb-1">
                                <i className="fas fa-user" />
                                &nbsp;
                                {author}
                            </div>

                            <h5 className="py-2 text-center text-wrap">{title}</h5>

                            <div className="d-flex mt-2 justify-content-between">
                                <div className="category">
                                    <i className="fas fa-music"></i> &nbsp;{instrument}{" "}
                                </div>

                                <div className="date">
                                    <i className="far fa-calendar-alt"></i>&nbsp;{" "}
                                    <Moment locale="hu" format="'YY MMM Do, HH:mm">
                                        {posted_date}
                                    </Moment>
                                </div>
                            </div>

                            <div className="d-flex mt-2 justify-content-between">
                                <div className="place">
                                    <i className="fas fa-street-view"></i>&nbsp; {place}
                                </div>
                                <span className="btn-moreinfo" onClick={moreInfo}>
                                    több info <i className="fas fa-chevron-right"></i>
                                </span>
                            </div>

                            {/* IF USER LOGGED IN */}
                            {!isLoading && user && user._id === authorId ? (
                                <div className="d-flex mt-1 justify-content-between">
                                    <button
                                        className="btn btn-edit"
                                        onClick={(e) => {
                                            editThisPost(e);
                                        }}
                                    >
                                        szerkesztés &nbsp; <i className="far fa-edit"></i>
                                    </button>
                                    <button className="btn btn-delete" onClick={(e) => deletePost(_id)}>
                                        törlés &nbsp; <i className="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col-md-12 mt-2">
                    <p className="text-justify align-self-center description">
                        {description.substring(0, 270)}
                        {description.length > 270 ? <b>... </b> : "  "} &nbsp; &nbsp;
                        <Link to="#" onClick={moreInfo} className="text-secondary">
                            <i className="fas fa-chevron-right"></i>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, getPostById, setEditPost })(Post);
