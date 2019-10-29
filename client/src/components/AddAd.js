import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { newAd, setEditAd, editAd } from '../actions/adsActions';
import { Link } from 'react-router-dom';
import SuggestInput from './SuggestInput';

import { setAlert } from '../actions/alertActions';
import { telepulesek } from '../resources/telepulesek';

const AddAd = ({
    setAlert,
    ads: { ad, editing },
    auth: { user, isAuthenticated },
    history,
    newAd,
    setEditAd,
    editAd
}) => {
    const [formData, setFormData] = useState({
        authorId: '',
        author: '',
        title: '',
        persOrBand: 'person',
        instrument: '',
        place: '',
        description: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            setFormData({
                ...formData,
                authorId: user._id,
                author: user.name,
                persOrBand: 'person'
            })
        }
        if (editing && ad !== null) {
            setFormData({
                title: ad.title,
                persOrBand: ad.pers_or_band,
                instrument: ad.instrument,
                place: ad.place,
                description: ad.description
            })
        }
        // eslint-disable-next-line
    }, [ad]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onPlaceSuggestChange = (newValue) => {
        setFormData({
            ...formData,
            place: newValue
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            editAd(ad._id, formData);
            history.push('/zeneszkereso/');
        } else {
            newAd(formData);
            history.push('/zeneszkereso/');
        }

    }

    return (
        <>
            <div className="newAdBox">

                <h2 className="red text-center">{!editing ? 'Új hirdetés' : 'Hirdetés módosítása'}</h2>

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
                            <SuggestInput
                                suggestValues={telepulesek}
                                onSuggestValueChange={onPlaceSuggestChange}
                                value={formData.place} />
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
                    {!editing ? <input type="submit" className="form-control btn btn-red" value="Hirdetést felad" />
                        : <input type="submit" className="form-control btn btn-orange" value="Hirdetést módosít" />
                    }
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
    auth: state.auth,
    ads: state.ads
})

export default connect(mapStateToProps, { newAd, setEditAd, editAd, setAlert })(AddAd);
