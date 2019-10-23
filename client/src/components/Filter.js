import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alertActions';
import SuggestInput from './SuggestInput';

import { telepulesek } from '../resources/telepulesek';

const Filter = ({ dispatch }) => {
    return (
        <form className="szuresForm">
            <h4 className="text-center szuresFocim">Szűrés</h4>
            <div className="form-group">
                <label htmlFor="instrumentSelect1">Hangszer</label>
                <select className="form-control" id="instrumentSelect1">
                    <option>összes</option>
                    <option>gitár</option>
                    <option>ének</option>
                    <option>dob</option>
                    <option>billentyű</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="placeInput1">Helyszín</label>
                {/* <input type="text" className="form-control" id="placeInput1" placeholder="pl: Budapest" /> */}
                <SuggestInput suggestValues={telepulesek} onSuggestValueChange={()=>null} />
            </div>
            <div className="form-group text-center">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" />
                    <label className="form-check-label" htmlFor="inlineRadio1">zenészek</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                        value="option2" />
                    <label className="form-check-label" htmlFor="inlineRadio2">zenekarok</label>
                </div>
            </div>


            <button type="submit" className="btn btn-purpule btn-block" onClick={e => {
                e.preventDefault();
                dispatch(setAlert({ msg: 'Sikeres regisztráció!' }, 'success'));
            }}>Keres</button>

        </form>
    )
}

export default connect()(Filter);