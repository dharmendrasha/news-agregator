import { useState } from "react"
import AuthUser from './AuthUser';

export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        // api call
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.access_token);
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

                <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    />
                    <label className="custom-control-label ml-1" htmlFor="customCheck1">
                    Remember me
                    </label>
                </div>
                </div>

                <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={submitForm}>
                    Submit
                </button>
                </div>
                <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
                </p>
            </div>
         </form>
    )
}