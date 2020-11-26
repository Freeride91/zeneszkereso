import React, { useState } from 'react';
import { connect } from 'react-redux';
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
                payload: { ...formData, place: newValue }
            });
    }

    return (
        <>
            <div className="filter--container d-flex justify-content-center pb-2 pt-2 mb-3">
                <div className="szuresInner d-flex align-items-center mr-4">
                    <h4 className="filter--title d-none d-md-block mr-md-5 mb-0 mt-4 text-secondary">Keres:</h4>
                    <div className="form-group mr-1 mr-md-3 mb-0">
                        <label>Hangszer:</label>
                        <input type="text" className="form-control"
                            placeholder="pl: gitár" name="instrument" onInput={e => onChange(e)} />
                    </div>


                    <div className="form-group mr-1 mr-md-3 mb-0">
                        <label>Helyszín:</label>
                        <SuggestInput
                            suggestValues={telepulesek}
                            onSuggestValueChange={onPlaceSuggestChange}
                            value={formData.place} />
                    </div>

                    <div className="pt-3 ml-2">
                        {/* CHECKBOXOK */}
                        <div className="form-group mb-0">
                            <div className="form-check">
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

                            <div className="form-check">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect()(Filter);