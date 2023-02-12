import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { postUserRegisterApi } from "../utils/api-list";

export default function Register() {
    const navigate = useNavigate();
    const {setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isLoading, setLoading] = useState(false)

    const submitForm = () =>{
        // api call
        setLoading(true)
        postUserRegisterApi({ name, email, password }).then(res => {
            setLoading(false)
            setToken({name, email}, res.data.jwt)
            navigate('/')
        }).catch(e => {
            setLoading(false)
            alert('Unable to register please try with another email address.')
        });
        // http.post('/register',{email:email,password:password,name:name}).then((res)=>{
        //     navigate('/login')
        // })
    }

    return(
        <div className="login-inner">
            <h1 className="text-center mb-3">Register </h1>
            <div className="form-group">
                <label>Name:</label>
                <input type="test" className="form-control" placeholder="Enter name"
                    onChange={e=>setName(e.target.value)}
                id="email" />
            </div>
            <div className="form-group mt-3">
                <label>Email address:</label>
                <input type="email" className="form-control" placeholder="Enter email"
                    onChange={e=>setEmail(e.target.value)}
                id="email" />
            </div>

            <div className="form-group mt-3">
                <label>Password:</label>
                <input type="password" className="form-control" placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                id="pwd" />
            </div>
            <button type="button" disabled={isLoading} onClick={submitForm} className="btn btn-primary mt-4">Register</button>
        </div>
    )
}