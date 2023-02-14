import { useEffect, useState } from "react";
import {
  getUserProfileApi,
  postUpdateProfileFeed,
  getAvailableNewsOptions,
} from "../utils/api-list";
import { md5 } from "../utils/crypto.util";
import Loader from './loader'
import "../styles/profile.css";


export default function Profile() {
  const [userdetail, setUserdetail] = useState({});
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
      fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
      setLoading(true);
      getUserProfileApi()
        .then((res) => {
          setUserdetail(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    };

    if (isLoading) {
     return <Loader />
    }

   return (
     <section className="bg-light profile-container">
       <div className="container">
         <div className="row align-items-center">
           <ProfileDetails {...userdetail} />
         </div>
       </div>
     </section>
   );
}

export const PersonalizeFeed = ({
  default_source,
  default_category,
  default_language,
  default_country,
}) => {
  const [category, setCategory] = useState(default_category);
  const [source, setSource] = useState(default_source);
  const [language, setlanguage] = useState(default_language);
  const [country, setCountry] = useState(default_country);
  const [isLoading, setLoading] = useState(false);
  const [isSaved, setSaved] = useState(false)
  const [availableSources, setAvailableSources] = useState([]);
  const [availableCategory, setAvailableCategory] = useState([]);
  const [availableLanguage, setAvailableLanguage] = useState([]);
  const [availableCountry, setAvailableCountry] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAvailableNewsOptions()
      .then((v) => {
        setAvailableSources(v.sources);
        setAvailableCategory(v.category);
        setAvailableLanguage(v.language);
        setAvailableCountry(v.country);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const updateSettings = () => {
    setLoading(true);
    postUpdateProfileFeed({ country, category, source, language })
      .then((v) => {
        setLoading(false);
        setSaved(true);
      })
      .catch((e) => setLoading(false));
  };

  return (
    <>
      <h5>Get Personalize news feed.</h5>
      <form >
        <div class="form-group">
          <label for="inputSourced" class="col-sm-2 col-form-label">
            Source
          </label>
          <div class="col-sm-10">
            <select
              className="form-control"
              id="inputSourced"
              onChange={(e) => setSource(e.target.value)}
            >
              <option selected>Please select sources</option>
              {Array.isArray(availableSources) &&
                availableSources.map((v) => {
                  if (v.id === source) {
                    return (
                      <>
                        <option selected value={v.id}>
                          {v.name}
                        </option>
                      </>
                    );
                  }
                  return (
                    <>
                      <option value={v.id}>{v.name}</option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="inputCategory" class="col-sm-2 col-form-label">
            Category
          </label>
          <div class="col-sm-10">
            <select
              className="form-control"
              id="inputCategory"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Please select Category</option>
              {Array.isArray(availableCategory) &&
                availableCategory.map((v) => {
                  if (v === category) {
                    return (
                      <option selected value={v}>
                        {v}
                      </option>
                    );
                  }
                  return (
                    <>
                      <option value={v}>{v}</option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="inputLanguage" class="col-sm-2 col-form-label">
            Language
          </label>
          <div class="col-sm-10">
            <select
              className="form-control"
              id="inputLanguage"
              onChange={(e) => setlanguage(e.target.value)}
            >
              <option selected>Please select language</option>
              {Array.isArray(availableLanguage) &&
                availableLanguage.map((v) => {
                  if (v === language) {
                    return (
                      <option selected value={v}>
                        {v}
                      </option>
                    );
                  }
                  return (
                    <>
                      <option value={v}>{v}</option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="inputCountry" class="col-sm-2 col-form-label">
            Country
          </label>
          <div class="col-sm-10">
            <select
              className="form-control"
              id="inputCountry"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option selected>Please select Country</option>
              {Array.isArray(availableCountry) &&
                availableCountry.map((v) => {
                  if (v === country) {
                    return (
                      <option selected value={v}>
                        {v}
                      </option>
                    );
                  }
                  return (
                    <>
                      <option value={v}>{v}</option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>

        <br />
        <button
          type="button"
          onClick={updateSettings}
          disabled={isLoading}
          className="btn btn-primary"
        >
          Update feed Settings
        </button>

        {isSaved && <p>Settings has been successfully updated.</p>}
      </form>
    </>
  );
};

export const ProfileDetails = ({email, name, feed}) => {
    return (
      <>
        <div className="col-lg-6 mb-4 mb-lg-0">
          <center>
            <img src={`https://www.gravatar.com/avatar/${md5(email)}?s=200`} />
          </center>
        </div>
        <div className="col-lg-6 px-xl-10">
          <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
            <h3
              className="h2 text-white mb-0"
              style={{ textTransform: "capitalize" }}
            >
              {name}
            </h3>
          </div>
          <ul className="list-unstyled mb-1-9">
            <li className="mb-2 mb-xl-3 display-28">
              <span className="display-26 text-secondary me-2 font-weight-600">
                Email:
              </span>{" "}
              <a href={`mailto:${email}`}><span className="h4">{email}</span></a>
            </li>
          </ul>
          <PersonalizeFeed {...feed} />
        </div>
      </>
    );
}
