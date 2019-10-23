import React, { useEffect } from 'react';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAds } from '../actions/adsActions';
import Ad from './Ad';

const Ads = ({getAds, ads: {ads, loading} }) => {
    useEffect(() => {
        getAds();
    }, [getAds]);


    return (
        <>
            {loading ? (<Spinner />) : ads.map(ad => <Ad
                key={ad._id}
                ad={ad} />
            )}
        </>
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
