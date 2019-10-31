import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';

//redux
import { connect } from 'react-redux';
import { register } from "../actions/authActions";

import { setAlert } from '../actions/alertActions';
import CustomAlert from './layout/CustomAlert';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: ''
    };

    static propTypes = {
        //not required, because it can be null :)
        isAuthenticated: PropTypes.bool,
        register: PropTypes.func.isRequired,
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password, password2 } = this.state;

        if (password !== password2) {
            this.props.setAlert({msg: 'Jelszavak nem eggyeznek'}, 'danger');
        } else {
            //create user object
            const newUser = {
                name,
                email,
                password
            };
    
            //attempt to register
            this.props.register(newUser);
        }

       

    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/zeneszkereso/' />
        }
        return this.props.isLoading ? <Spinner /> :
            <>
                <div className="container loginSiteContainer">

                    <CustomAlert />

                    <div className="loginBox text-center mt-3">
                        <h1 className="red">Regisztráció</h1>
                        <p className="lead"><i className="fas fa-user"></i> Hozz létre egy új fiókot </p>

                        <form className="form" action="#" onSubmit={e => this.onSubmit(e)} autoComplete="false">
                            <div className="form-group">
                                <input onChange={this.onChange} type="email" className="form-control" placeholder="E-mail cím" name="email" autoComplete="false"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.onChange} type="text" className="form-control" placeholder="Felhasználónév" name="name" autoComplete="false" />
                            </div>
                            <div className="form-group">
                                <input onChange={this.onChange} type="password" className="form-control" placeholder="Jelszó" name="password" minLength="6" autoComplete="false"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.onChange} type="password" className="form-control" placeholder="Jelszó megerősítése" name="password2" minLength="6" autoComplete="false"/>
                            </div>
                            <input type="submit" className="form-control btn btn-red" value="Regisztráció" />
                        </form>
                        <p className="mt-3 text-muted">
                            Már van fiókod? <Link to="/zeneszkereso/login">Jelentkezz be!</Link>
                        </p>
                    </div>

                </div>
            </>
    }
}


const mapStateToProps = state => ({
    //just two boolean fields from authReducer
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { register, setAlert })(Register);