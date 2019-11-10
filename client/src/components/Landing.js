import React from 'react';
import Posts from './Posts';
import Filter from './Filter';
import CustomAlert from './layout/CustomAlert';

// import { Row, Col } from 'reactstrap';


export default function Landing({ history }) {
    return (
        <>

            <h2 className="pt-3 pb-2 focim border-bottom text-center">Hirdetések</h2>
            <CustomAlert />


            <Filter />

            <div className="hirdetesekContainer">


                    <Posts history={history} />


                <div className="tr-footer">&nbsp;</div>
            </div>

        </>
    )
}
