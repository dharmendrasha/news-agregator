import { useEffect, useState } from "react";
import "../styles/profile.css";
import { getUserProfileApi } from "../utils/api-list";
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
         <div className="row">
           <div className="col-lg-12 mb-4 mb-sm-5">
             <div className="card card-style1 border-0">
               <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                 <div className="row align-items-center">
                   <div className="col-lg-6 mb-4 mb-lg-0">
                     <img
                       src={`https://www.gravatar.com/avatar/${md5(
                         userdetail.email
                       )}?s=400`}
                     />
                   </div>
                   <div className="col-lg-6 px-xl-10">
                     <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                       <h3
                         className="h2 text-white mb-0"
                         style={{ textTransform: "capitalize" }}
                       >
                         {userdetail.name}
                       </h3>
                     </div>
                     <ul className="list-unstyled mb-1-9">
                       <li className="mb-2 mb-xl-3 display-28">
                         <span className="display-26 text-secondary me-2 font-weight-600">
                           Email:
                         </span>{" "}
                         {userdetail.email}
                       </li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
}
