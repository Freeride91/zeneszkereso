import React from 'react';
import Ads from './Ads';
import Filter from './Filter';
import CustomAlert from './layout/CustomAlert';

import { Row, Col } from 'reactstrap';


export default function Landing() {
    return (
        <>
            <h2 className="my-4 text-center focim">Hirdetések</h2>
            <Row>
                <CustomAlert />
                <Col md="3">
                    <Filter />
                </Col>
                <Col md="9" className="hirdetesekContainer">
                    <Ads />
                </Col>

            </Row>


        </>
    )
}
