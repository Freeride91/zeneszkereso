import React from 'react';
import Ads from './Ads';
import Filter from './Filter';
import CustomAlert from './layout/CustomAlert';

// import { Row, Col } from 'reactstrap';


export default function Landing({ history }) {
    return (
        <>
            <h2 className="mt-4 mb-3 text-center focim">Hirdetések</h2>

            <CustomAlert />

            <div className="hirdetesekContainer">
                <Filter />
                <Ads history={history} />
            </div>

        </>
    )
}
