import React from "react";

const Login = (props) => {
  const {onRoleButtonClick} = props;

    return (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem", alignItems: 'center' }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-3">Login as</h3>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-4"
                  type="button"
                  title="Host"
                  style={{width: '6.25rem'}}
                  onClick={() => {onRoleButtonClick('Host')}}
                >
                  Host
                </button>
                <button
                  className="btn btn-primary btn-lg btn-block mb-4"
                  type="button"
                  title="Guest"
                  style={{width: '6.25rem'}}
                  onClick={() => {onRoleButtonClick('Guest')}}
                >
                  Guest
                </button>
              </div>
            </div>
          </div>
        </div>
          );
};

export default Login;