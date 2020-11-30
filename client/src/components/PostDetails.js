import React from "react";
// import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Spinner from "./layout/Spinner";
import CustomAlert from "./layout/CustomAlert";

import "moment/locale/hu";
import Moment from "react-moment";

import { connect } from "react-redux";
import { setEditPost, deletePost, getPostById } from "../actions/postsActions";

const PostDetails = ({ history, getPostById, setEditPost, deletePost, posts: { post, loading }, auth: { user, isLoading } }) => {
    // useEffect(() => {
    //     // getPostById('5db9a00f6772465e6bffe5f4');
    // }, [])

    const editThisPost = () => {
        getPostById(post._id);
        setEditPost(true);
        history.push("/zeneszkereso/add_post");
    };

    const deleteThisPost = () => {
        deletePost(post._id);
        history.push("/zeneszkereso/");
    };

    return loading || post === null ? (
        <Spinner />
    ) : (
        <>
            <div className="container-720">
                <div className="py-2">
                    <Link to="/zeneszkereso/" className="text-secondary">
                        <i className="fas fa-chevron-left"></i> <b>Hirdetések</b>
                    </Link>
                </div>

                <CustomAlert />
                <div className="hirdetes">
                    <div className="p-1 mb-2 text-center">
                        {post.pers_or_band === "person" ? <i className="fas fa-user iconUser"></i> : <i className="fas fa-users iconUsers"></i>}
                    </div>

                    <div className="d-flex">
                        <div className="w-100">
                            <div className="author mb-2 text-center">
                                <i className="fas fa-user" />
                                &nbsp;{post.author}
                            </div>

                            <h5 className="py-2 text-center">{post.title}</h5>

                            <div className="mt-2 d-flex justify-content-between">
                                <div className="category"> {post.instrument} </div>
                                <div className="date">
                                    <i className="far fa-calendar-alt"></i>&nbsp;&nbsp;
                                    <Moment locale="hu" format="MMMM Do, HH:mm">
                                        {post.posted_date}
                                    </Moment>
                                </div>
                            </div>

                            <div className="pb-3 pt-2 d-flex justify-content-between  border-bottom">
                                <div className="place">
                                    <i className="fas fa-street-view"></i>&nbsp; {post.place}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <p className="text-justify description mt-4 mb-1">{post.description}</p>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between justify-content-md-end kapcsolat-details">
                        <span className="text-secondary hide-sm mr-3">Kapcsolat:</span>
                        <span>
                            <i className="far fa-envelope"></i> {post.email ? post.email : "-"}
                        </span>
                        <span className="ml-4">
                            <i className="fas fa-mobile-alt"></i> {post.phoneNum ? post.phoneNum : "-"}
                        </span>
                    </div>

                    {!isLoading && user && user._id === post.authorId ? (
                        <>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-edit mr-1"
                                    onClick={(e) => {
                                        editThisPost(e);
                                    }}
                                >
                                    szerkesztés &nbsp; <i className="far fa-edit"></i>
                                </button>
                                <button className="btn btn-delete" onClick={(e) => deleteThisPost(e)}>
                                    törlés &nbsp; <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    auth: state.auth,
});

export default connect(mapStateToProps, { getPostById, setEditPost, deletePost })(PostDetails);
