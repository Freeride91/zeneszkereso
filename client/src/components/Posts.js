import React, { useEffect } from "react";
import Spinner from "./layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/postsActions";
import Post from "./Post";

const Posts = ({ history, getPosts, posts: { posts, filteredPosts, filtering, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    let renderedPosts;
    if (loading) {
        renderedPosts = <Spinner />;
    } else if (filtering) {
        renderedPosts = filteredPosts.map((post) => <Post history={history} key={post._id} post={post} />);
    } else {
        renderedPosts = posts.map((post) => <Post history={history} key={post._id} post={post} />);
    }

    return <div className="post-list-wrap">{renderedPosts}</div>;
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
