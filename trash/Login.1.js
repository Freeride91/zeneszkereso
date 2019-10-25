import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from "reactstrap";

//redux
import { connect } from 'react-redux';
import { login } from "../client/src/actions/authActions";
import { clearErrors } from "../client/src/actions/errorActions";



class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        //auth not required, because it can be null :)
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        if (this.props.error !== prevProps.error) {
            if (this.props.error.id === 'LOGIN_FAIL') {
                this.setState({ msg: this.props.error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

    }

    onChange = e => {
        //amint elkezdek írni a mezőbe újra, törlöm a hibákat az errorReducer state-ből
        //---csak akkor fut ha még kinn van az errorüzenet (msg nem null) (egyszer fut)
        if (this.state.msg !== null) {
            this.props.clearErrors();
        }

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const {email, password} = this.state;

        const user = {
            email,
            password
        }

        //attempt to login
        this.props.login(user);

    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/ads' />
        }
        return (
            <>
                <div className="container loginSiteContainer">
                    {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}

                    <div className="loginBox text-center mt-3">
                        <h1 className="purpule-darker">Bejelentkezés</h1>
                        <p className="lead"><i className="fas fa-user"></i> Jelentkezz be a fiókodba</p>

                        <form onSubmit={e => this.onSubmit(e)} className="form" action="#">
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
    //the whole state from errorReducer
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login);


























// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Login() {
//     return (
//         <>
//         </>
//     )
// }
