import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import Spinner from './layout/Spinner';
import CustomAlert from './layout/CustomAlert';
import Post from './Post';

import { connect } from 'react-redux';
import { getPostsByUser } from '../actions/postsActions';

const Dashboard = ({ history, getPostsByUser, auth: { isLoading, user }, posts }) => {
    useEffect(() => {
        if (user) getPostsByUser(user._id);
    }, [getPostsByUser, user]);

    return isLoading || user === null ? <Spinner /> :
        <>
            <div className="controlMaxWidth1200">
                <h2 className="mt-4">Üdv a zenészkeresőn, <span className="purpule">{user.name}</span>!</h2>
                <hr />
                <br />
                <CustomAlert />

                <h3 className="text-center">Hirdetéseid:</h3>
                <div className="hirdetesekContainer">
                    {posts.loading ? (<Spinner />) :
                        posts.posts.length === 0 ?
                            (<h4 className="text-center font-weight-light mt-4">Jelenleg nincs hirdetésed</h4>)
                            :
                            posts.posts.map(post => <Post history={history} key={post._id} post={post} />)
                    }
                </div>
                <div className="tr-footer">&nbsp;</div>
            </div>
        </>
}

// Dashboard.propTypes = {

// }

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
})

export default connect(mapStateToProps, { getPostsByUser })(Dashboard)
