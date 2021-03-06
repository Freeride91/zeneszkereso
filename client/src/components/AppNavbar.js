import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//REDUX STUFF
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";

class Navbar extends Component {
    onLogoutClick = () => {
        this.props.logout();
        this.props.history.push("/zeneszkereso/");
        this.props.setAlert({ msg: "Kijelentkezve!" }, "danger");
    };

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-md bg-dark navbar-dark">
                    <div className="container-lg">
                        <Link to="/zeneszkereso/" className="navbar-brand">
                            <i className="far fa-play-circle"></i> Zenészkereső
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                {!this.props.isAuthenticated ? (
                                    <>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="/zeneszkereso/login" className="nav-link btn btn-nav">
                                                Hirdetés feladása
                                            </Link>
                                        </li>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="/zeneszkereso/register" className="nav-link">
                                                Regisztráció
                                            </Link>
                                        </li>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="/zeneszkereso/login" className="nav-link">
                                                Bejelentkezés
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="/zeneszkereso/add_post" className="nav-link btn btn-nav">
                                                Hirdetés feladása
                                            </Link>
                                        </li>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="/zeneszkereso/dashboard" className="nav-link">
                                                <i className="fas fa-user-circle"></i> &nbsp;
                                                <strong>{this.props.user && this.props.user.name}</strong>
                                            </Link>
                                        </li>
                                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                                            <Link to="#" onClick={() => this.onLogoutClick()} className="nav-link">
                                                <i className="fas fa-sign-out-alt"></i> Kijelentkezés
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, { logout, setAlert })(Navbar));
