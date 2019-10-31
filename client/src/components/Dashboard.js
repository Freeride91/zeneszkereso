import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import Spinner from './layout/Spinner';
import CustomAlert from './layout/CustomAlert';
import Ad from './Ad';

import { connect } from 'react-redux';
import { getAdsByUser } from '../actions/adsActions';

const Dashboard = ({ history, getAdsByUser, auth: { isLoading, user }, ads }) => {
    useEffect(() => {
        if (user) getAdsByUser(user._id);
    }, [getAdsByUser, user]);

    return isLoading ? <Spinner /> :
        <>
            <h2 className="mt-4">Üdv a zenészkeresőn, <span className="purpule">{user.name}</span>!</h2>
            <hr />
            <br />
            <CustomAlert />

            <h3 className="text-center">Hirdetéseid:</h3>
            <div className="hirdetesekContainer">
                {ads.loading ? (<Spinner />) :
                    ads.ads.length === 0 ?
                        (<h4 className="text-center font-weight-light mt-4">Jelenleg nincs hirdetésed</h4>)
                        :
                        ads.ads.map(ad => <Ad history={history} key={ad._id} ad={ad} />)
                }
            </div>
        </>
}

// Dashboard.propTypes = {

// }

const mapStateToProps = state => ({
    auth: state.auth,
    ads: state.ads
})

export default connect(mapStateToProps, { getAdsByUser })(Dashboard)
