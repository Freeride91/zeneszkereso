import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomAlert from './layout/CustomAlert';

//redux
import { connect } from 'react-redux';
import { login } from "../actions/authActions";


class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    static propTypes = {
        //auth not required, because it can be null :)
        isAuthenticated: PropTypes.bool,
        login: PropTypes.func.isRequired,
    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email: email,
            password: password
        }

        //attempt to login
        this.props.login(user);
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/zeneszkereso/ads' />
        }
        return (
            <>
                <div className="container loginSiteContainer">

                    <CustomAlert />

                    <div className="loginBox text-center mt-3">
                        <h1 className="purpule-darker">Bejelentkezés</h1>
                        <p className="lead"><i className="fas fa-user"></i> Jelentkezz be a fiókodba</p>

                        <form onSubmit={e => this.onSubmit(e)} className="form" action="#" autoComplete="on">
                            <div className="form-group">
                                <input
                                    onChange={this.onChange}
                                    type="email"
                                    className="form-control"
                                    placeholder="E-mail cím"
                                    name="email"
                                    required />
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={this.onChange}
                                    type="password"
                                    className="form-control"
                                    placeholder="Jelszó"
                                    name="password" />
                            </div>
                            <input type="submit" className="form-control btn btn-purpule" value="Bejelentkezés" />
                        </form>


                        <p className="mt-3 text-muted">
                            Még nincs fiókod? <Link to="/zeneszkereso/register" >Regisztrálj!</Link>
                        </p>
                    </div>
                    
                </div>



            </>
        )
    }
}


const mapStateToProps = state => ({
    //just one boolean field from authReducer
    isAuthenticated: state.auth.isAuthenticated,

})

export default connect(mapStateToProps, { login })(Login);
