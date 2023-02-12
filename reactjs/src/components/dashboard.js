import { useEffect, useState } from 'react';
import { getUserProfileApi } from '../utils/api-list';

export default function Dashboard() {
    const [userdetail,setUserdetail] = useState({});
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () => {
        setLoading(true)
        getUserProfileApi().then(res => {
            setUserdetail(res.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }

    return(
        <div>
            <h1 className='mb-4 mt-4'>Dashboard page</h1>
            {!isLoading && <UserProfile {...userdetail} />}
        </div>
    )
}


function UserProfile({name, email}) {
        return (
          <div>
            <h4>Name</h4>
            <p>{name}</p>
            <h4>Email</h4>
            <p>{email}</p>
          </div>
        );
}