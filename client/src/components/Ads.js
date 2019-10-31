import React, { useEffect } from 'react';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAds } from '../actions/adsActions';
import Ad from './Ad';

const Ads = ({ history, getAds, ads: { ads, filteredAds, filtering, loading } }) => {
    useEffect(() => {
        getAds();
    }, []);

    let renderedAds;
    if (loading) {
        renderedAds = <Spinner />
    } else if (filtering) {
        renderedAds = (filteredAds.map(ad => <Ad
            history={history}
            key={ad._id}
            ad={ad} />)
        )
    } else {
        renderedAds = (ads.map(ad => <Ad
            history={history}
            key={ad._id}
            ad={ad} />)
        )
    }

    return (
        renderedAds
    )
}

Ads.propTypes = {
    getAds: PropTypes.func.isRequired,
    ads: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    ads: state.ads
})

export default connect(mapStateToProps, { getAds })(Ads);
