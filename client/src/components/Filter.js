import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alertActions';
import SuggestInput from './SuggestInput';
import {
    FILTER_BY_DATA
} from '../actions/types';

import { telepulesek } from '../resources/telepulesek';

const Filter = ({ dispatch }) => {

    const [formData, setFormData] = useState({
        instrument: '',
        place: '',
        person: true,
        band: true,
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'instrument') {
            dispatch({
                type: FILTER_BY_DATA,
                payload: { ...formData, [e.target.name]: e.target.value }
            });
        }
    }

    const onPlaceSuggestChange = (newValue) => {
        setFormData({
            ...formData,
            place: newValue
        })
        dispatch({
            type: FILTER_BY_DATA,
            payload: {...formData, place: newValue}
        });
    }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     dispatch(setAlert({ msg: 'Fejlesztés alatt!' }, 'secondary'));
    // }

    return (
        <form className="szuresForm">
            <h4 className="text-center szuresFocim">Szűrés</h4>
            <div className="form-group">
                <label htmlFor="instrumentInput1">Hangszer</label>
                <input type="text" className="form-control" id="instrumentInput1"
                    placeholder="pl: gitár" name="instrument" onInput={e => onChange(e)} />
                {/* <select className="form-control" id="instrumentSelect1">
                    <option>összes</option>
                    <option>gitár</option>
                    <option>ének</option>
                    <option>dob</option>
                    <option>billentyű</option>
                </select> */}
            </div>
            <div className="form-group">
                <label htmlFor="placeInput1">Helyszín</label>
                {/* <input type="text" className="form-control" id="placeInput1" placeholder="pl: Budapest" /> */}
                <SuggestInput 
                suggestValues={telepulesek} 
                onSuggestValueChange={onPlaceSuggestChange} 
                value={formData.place}/>
            </div>
            <div className="form-group text-center">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="zeneszek" checked={formData.person}
                        onChange={e => {
                            setFormData({ ...formData, person: e.target.checked });
                            dispatch({
                                type: FILTER_BY_DATA,
                                payload: { ...formData, person: e.target.checked }
                            });
                        }} />
                    <label className="form-check-label" htmlFor="zeneszek">zenészek</label>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="zenekarok" checked={formData.band}
                        onChange={e => {
                            setFormData({ ...formData, band: e.target.checked });
                            dispatch({
                                type: FILTER_BY_DATA,
                                payload: { ...formData, band: e.target.checked }
                            });
                        }} />
                    <label className="form-check-label" htmlFor="zenekarok">zenekarok</label>
                </div>
            </div>


            {/* <button type="submit" className="btn btn-purpule btn-block" onClick={e => handleSubmit(e)}>
                Keres - <small>fejlesztés alatt</small></button> */}

        </form>
    )
}

export default connect()(Filter);