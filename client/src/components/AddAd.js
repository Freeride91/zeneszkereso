import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { newAd, setEditAd, editAd } from '../actions/adsActions';
import { Link } from 'react-router-dom';
import SuggestInput from './SuggestInput';

import { setAlert } from '../actions/alertActions';
// import CustomAlert from './layout/CustomAlert';
import { telepulesek } from '../resources/telepulesek';

const AddAd = ({
    ads: { ad, editing },
    auth: { user, isAuthenticated },
    history,
    newAd,
    editAd,
}) => {
    const [formData, setFormData] = useState({
        authorId: '',
        author: '',
        title: '',
        persOrBand: 'person',
        instrument: '',
        place: '',
        description: '',
        email: '',
        phoneNum: ''
    });

    useEffect(() => {
        if (user != null) {
            setFormData({
                ...formData,
                authorId: user._id,
                author: user.name,
                persOrBand: 'person',
                email: user.email
            })
        }

        //ha szerkeszteni jövök meglévő AD-dal
        if (editing && ad !== null) {
            setFormData({
                title: ad.title,
                persOrBand: ad.pers_or_band,
                instrument: ad.instrument,
                place: ad.place,
                description: ad.description,
                email: ad.email ? ad.email : user.email,
                phoneNum: ad.phoneNum ? ad.phoneNum : ''
            })
        }
        // eslint-disable-next-line
    }, [user, ad, isAuthenticated]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onPlaceSuggestChange = (newValue) => {
        setFormData({
            ...formData,
            place: newValue
        })
    }

    const vissza = (e) => {
        e.preventDefault();
        history.go(-1); return false;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            editAd(ad._id, formData);
            history.push('/zeneszkereso/ad_details');
            // history.goBack();
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
                            placeholder="pl.: Gitárost keresünk most induló hard-rock zenekarba"
                            required />
                    </div>


                    <div className="form-group d-md-flex justify-content-between">
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
                    
                    <div className="form-group mb-1">
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
                        <label htmlFor="description"><i className="far fa-file-alt"></i> &nbsp;<b>Hirdetés szövege:</b></label>
                        <textarea
                            value={formData.description}
                            onChange={e => onChange(e)}
                            className="form-control"
                            rows="5"
                            name="description"
                            required> </textarea>
                    </div>
                    <div className="form-group mb-1">
                        <div className="divideFlexInput">
                            <label htmlFor="email" className="mt-2"><i className="far fa-envelope"></i> &nbsp;E-mail:</label>
                            <input
                                value={formData.email}
                                onChange={e => onChange(e)} type="text"
                                className="form-control"
                                name="email"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="divideFlexInput">
                            <label htmlFor="phoneNum" className="mt-2"><i className="fas fa-mobile-alt"></i>&nbsp; &nbsp;Mobil:</label>
                            <input
                                value={formData.phoneNum}
                                onChange={e => onChange(e)} type="text"
                                className="form-control"
                                name="phoneNum"
                                placeholder=""
                            />
                        </div>
                    </div>



                    {!editing ? <input type="submit" className="form-control btn btn-red" value="Hirdetést felad" />
                        : <input type="submit" className="form-control btn btn-orange" value="Hirdetést módosít" />
                    }
                </form>

                <p className="mt-3 mb-0">
                    <Link to="#" onClick={e => vissza(e)} className="text-secondary">
                        <i className="fas fa-chevron-left"></i>  vissza
                    </Link>
                </p>
            </div>
            <div className="tr-footer">&nbsp;</div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    ads: state.ads
})

export default connect(mapStateToProps, { newAd, setEditAd, editAd, setAlert })(AddAd);
