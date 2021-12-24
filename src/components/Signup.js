import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const Signup = ({ history }) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard')
        }
    },[])

    const onSignup = () => {
        setLoading(true);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => history.push('/'))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert.show(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-25 bg-white shadow-lg">
            <div className="m-5">
                <label className="d-block text-xl font-bold mb-2">Name</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                    type="name"
                    className="border-grey-200 border-2 rounded w-100 p-2 h-10"
                />
            </div>
            <div className="m-5">
                <label className="d-block text-xl font-bold mb-2">Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    className="border-grey-200 border-2 rounded w-100 p-2 h-10"
                />
            </div>
            <div className="m-5">
                <label className="d-block text-xl font-bold mb-2">Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    className="border-grey-200 border-2 rounded w-100 p-2 h-10"
                />
            </div>
            <div className="m-5">
                <button
                    onClick={onSignup}
                    className="w-25 text-white px-3 py-2 rounded text-xl font-bold"
                    style={{"background": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(4,111,188,1) 45%, rgba(4,119,193,1) 100%, rgba(0,212,255,1) 100%)"}}
                >
                    { loading ? 'Creating user ...' : 'Signup'}
                </button>
            </div>
            <div className="m-5">
                <Link to="/">
                    Already have an account?
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Signup;
