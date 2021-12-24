import { getAuth, signOut } from '@firebase/auth';
import React, {useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ history }) => {
    let [dogImage, setDogImage] = useState(null)
    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('token')
                history.push('/')
            })
            .catch((e) => alert(e.message))
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            history.push('/')
        }
    },[])


    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random/48")
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data => setDogImage(data.message))
      },[])

    const auth = getAuth();
    const user = auth.currentUser;




    return (
        <>
        <div className="navbar" >
                <div>
                    <h1>{user && user.displayName.toUpperCase()}</h1>
                </div>
                <div >
                    <button
                        onClick={logout}
                        className="w-100 text-white px-3 py-2 rounded text-xl font-bold"
                        style={{"background": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(4,111,188,1) 45%, rgba(4,119,193,1) 100%, rgba(0,212,255,1) 100%)"}}
                    >
                        Logout
                    </button>
                </div>
        </div>

        <div>

        <div className="image-container" >

        {dogImage && dogImage.map((dog) => {
            return(
                <div className="dog-container" >
                    <img  src={dog}></img>
                </div>
             )
        })}

        </div>

        </div>

        </>
           
    )
}

export default Dashboard;
