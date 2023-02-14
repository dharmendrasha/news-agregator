import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import Profile from "../components/profile";
import Search from "../components/search";
import { useState } from 'react';
import { useNavigation, useSearchParams } from "react-router-dom";
import { FilterModal } from '../components/FilterModel'


function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <span role="button" className="nav-link" onClick={logoutUser}>
                    Logout
                  </span>
                </li>
              </ul>
              <SearchComponent />
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    );
}

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q'))
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <>
      <FilterModal show={modalShow} onHide={() => setModalShow(false)} />
      <button
        className="btn btn-outline-success"
        type="button"
        style={{ marginRight: "10px" }}
        onClick={() => setModalShow(true)}
      >
        Filter
      </button>
      {/* <form className="d-flex" method="get" target="/search">
        <input
          className="form-control me-2"
          type="search"
          value={query}
          required
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />

        <br />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form> */}
    </>
  );
}

export default Auth;
