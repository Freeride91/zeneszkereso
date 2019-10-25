import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { newAd } from '../actions/adsActions';
import { Link } from 'react-router-dom';
import SuggestInput from './SuggestInput';

import { telepulesek } from '../resources/telepulesek';

const NewAd = ({ auth: { user, isAuthenticated }, history, newAd }) => {
    useEffect(() => {
        if (isAuthenticated) {
            setFormData({
                ...formData,
                author: user.name,
                authorId: user._id,
                persOrBand: 'person'
            })
        }
        // eslint-disable-next-line
    }, []);

    const [formData, setFormData] = useState({
        authorId: '',
        author: '',
        title: '',
        persOrBand: 'person',
        instrument: '',
        place: '',
        description: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onPlaceSuggestChange = (newValue) => {
         setFormData({
             ...formData,
             place: newValue
         })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        newAd(formData);

        history.push('/zeneszkereso/');
    }

    return (
        <>
            <div className="newAdBox">
                <h2 className="red text-center">Új hirdetés</h2>
                {/* <p className="lead"><i className="fas fa-user"></i> Hozz létre egy új fiókot </p> */}

                <form className="form newAdForm" action="#" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <label className="font-weight-bold" htmlFor="title">Hirdetés címe:</label>
                        <input
                            value={formData.title} onChange={e => onChange(e)}
                            type="text"
                            className="form-control"
                            name="title"
                            required />
                    </div>
                    <div className="form-group text-center d-flex justify-content-between">
                        <label className="font-weight-bold" htmlFor="hirdeto_type">Hirdető: </label>
                        <div className="form-check">
                            <input
                                checked={formData.persOrBand === 'person'}
                                onChange={e => onChange(e)}
                                className="form-check-input"
                                type="radio"
                                name="persOrBand"
                                value="person" />
                            <label className="form-check-label" htmlFor="persOrBand">zenész (zenekart keresek)</label>
                        </div>
                        <div className="form-check">
                            <input
                                checked={formData.persOrBand === 'band'}
                                onChange={e => onChange(e)}
                                className="form-check-input"
                                type="radio"
                                name="persOrBand"
                                value="band" />
                            <label className="form-check-label" htmlFor="persOrBand">zenekar (zenész kerestetik)</label>
                        </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <div className="divideFlexInput">
                            <label htmlFor="instrument" className="mt-2"><i className="fas fa-guitar"></i> &nbsp;Hangszer:</label>
                            <input
                                value={formData.instrument}
                                onChange={e => onChange(e)} type="text"
                                className="form-control"
                                name="instrument"
                                placeholder="pl: gitár"
                                required />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="divideFlexInput">
                            <label htmlFor="place" className="mt-2"><i className="fas fa-street-view"></i> &nbsp;Helyszín:</label>
                            <SuggestInput suggestValues={telepulesek} onSuggestValueChange={onPlaceSuggestChange}/>
                            {/* <input
                                value={formData.place}
                                onChange={e => onChange(e)}
                                type="text"
                                className="form-control"
                                name="place"
                                placeholder="pl: Budapest környéke" /> */}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><i className="far fa-file-alt"></i> &nbsp;Hirdetés szövege:</label>
                        <textarea
                            value={formData.description}
                            onChange={e => onChange(e)}
                            className="form-control"
                            rows="5"
                            name="description"
                            required> </textarea>
                    </div>
                    <input type="submit" className="form-control btn btn-red" value="Hirdetést felad" />
                </form>
                <p className="mt-3 mb-0">
                    <Link to="/zeneszkereso/" className="text-secondary">
                        <i className="fas fa-chevron-left"></i>  vissza a hirdetésekhez
                    </Link>
                </p>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { newAd })(NewAd);
