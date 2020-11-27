import React from "react";
import { connect } from "react-redux";

import { CSSTransition } from "react-transition-group";

const CustomAlert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 && (
        <>
            {alerts.map((alert) => (
                <CSSTransition key={alert.id} in={alert.display} appear={true} timeout={500} classNames="showAlert">
                    <div className="newDiv">
                        <div className={`alert alert-${alert.alertType} customAlert`}>{alert.msg.msg}</div>
                    </div>
                </CSSTransition>
            ))}
        </>
    );

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
