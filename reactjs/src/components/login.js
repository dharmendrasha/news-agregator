import { useState } from "react"
import AuthUser from './AuthUser';
import { useNavigate } from "react-router-dom";
import { postUserLoginApi } from "../utils/api-list";

export default function Login() {
    const { setToken } = AuthUser();
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isLoading, setLoading] = useState(false)

    const submitForm = () =>{
        setLoading(true)
        postUserLoginApi({ email, password }).then(res => {
            setLoading(false)
            setToken({ email }, res.data.jwt);
            navigate('/')
        }).catch(e => {
            setLoading(false)
            alert("Unable to login please try with another email address.");
        })
    }

    return(
        <form>
            <div className="login-inner">
                <h3>Sign In</h3>

                <div className="mb-3">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"
                    onChange={e=>setEmail(e.target.value)} id="email" />
                </div>

                <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                    id="pwd" />
                </div>                

                <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={submitForm} disabled={isLoading}>
                    Submit
                </button>
                </div>
               
            </div>
         </form>
    )
}