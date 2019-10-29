import React from 'react';
import Ads from './Ads';
import Filter from './Filter';
import CustomAlert from './layout/CustomAlert';

import { Row, Col } from 'reactstrap';


export default function Landing({ history }) {
    return (
        <>
            <h2 className="my-3 text-center focim">- Hirdetések -</h2>
            
            
            {/* <CustomAlert />
            <div className="hirdetesekContainer">
                <Filter />
                <Ads history={history} />
            </div> */}
            
            

            <Row>
                <CustomAlert />
                <Col md="3">
                    <Filter />
                </Col>
                <Col md="9" className="hirdetesekContainer">
                    <Ads history={history} />
                </Col>
            </Row>

            

        </>
    )
}
