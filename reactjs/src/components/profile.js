import { useEffect, useState } from "react";
import "../styles/profile.css";
import { getUserProfileApi, postUpdateProfileFeed } from "../utils/api-list";
import { md5 } from "../utils/crypto.util";


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
     return <p>Loading</p>
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
  default_author,
}) => {
    const [author, setAuthor] = useState(default_author)
    const [category, setCategory] = useState(default_category);
    const [source, setSource] = useState(default_source);
    const [isLoading, setLoading] = useState(false)

    const updateSettings = () => {
        setLoading(true)
        postUpdateProfileFeed({ author, category, source }).then((v) => {
            setLoading(false)

        }).catch(e => setLoading(false))
    }

    return (
      <>
        <h5>Get Personalize news feed.</h5>
        <form>
          <div class="form-group">
            <label for="inputSourced" class="col-sm-2 col-form-label">
              Source
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={source}
                class="form-control"
                onChange={(e) => setSource(e.target.value)}
                id="inputSourced"
                placeholder="Source"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputCategory" class="col-sm-2 col-form-label">
              Category
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                class="form-control"
                id="inputCategory"
                placeholder="Category"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAuthor" class="col-sm-2 col-form-label">
              Author
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                class="form-control"
                id="inputAuthor"
                placeholder="Author"
              />
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
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
          <PersonalizeFeed {...feed} />
        </div>
      </>
    );
}
