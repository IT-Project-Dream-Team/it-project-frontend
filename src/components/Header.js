import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { baseDevelopmentURL, LOGIN, SIGNUP } from '../utils/constants/index';
import './header.css';

export const Header = ({ page }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const id = 'logout';

  const logoutUser = async () => {
    try {
      const resUsers = await axios.get(`${baseDevelopmentURL}/user/all`, { withCredentials: true });
      const res = await axios.post(`${baseDevelopmentURL}/logout`, { withCredentials: true });
      console.log(resUsers.data);

      if (res.data.message === 'Successfully logged out') {
        localStorage.clear();
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response.data, {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: id,
      });
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg nav-bar p-0">
      <div className="container-fluid">
        {userName ? (
          <Link to={'/gallery'} className="pointer font-regular navbar-brand fs-2">
            Hyper_Link
          </Link>
        ) : (
          <a href="/" className="pointer font-regular navbar-brand fs-2">
            Hyper_Link
          </a>
        )}

        <div
          className="collapse navbar-collapse d-flex flex-row justify-content-end"
          id="navbarNav"
        >
          <nav className="navbar">
            <form className="container-fluid justify-content-start">
              {!userName ? (
                <>
                  {page === SIGNUP ? (
                    <Link to={'/login'}>
                      <button className="btn font-regular nav-button me-2" type="button">
                        Log in
                      </button>
                    </Link>
                  ) : page === LOGIN ? (
                    <Link to={'/signup'}>
                      <button className="btn font-regular nav-button m-2" type="button">
                        Sign up
                      </button>
                    </Link>
                  ) : (
                    <>
                      <Link to={'/login'}>
                        <button className="btn font-regular nav-button me-2" type="button">
                          Log in
                        </button>
                      </Link>
                      <Link to={'/signup'}>
                        <button className="btn font-regular nav-button m-2" type="button">
                          Sign up
                        </button>
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="m-3 fs-5">Hi, {userName}!</div>
                  <button
                    className="btn font-regular nav-button m-2"
                    type="button"
                    onClick={() => logoutUser()}
                  >
                    Log out
                  </button>
                </>
              )}
            </form>
          </nav>
        </div>
      </div>
    </nav>
  );
};
