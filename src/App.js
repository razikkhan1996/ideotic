import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyCst1iAbgfxznI4z98CiNUj2mzBR8EbiEk",
//   authDomain: "live-demo-b3724.firebaseapp.com",
//   projectId: "live-demo-b3724",
//   storageBucket: "live-demo-b3724.appspot.com",
//   messagingSenderId: "269118493133",
//   appId: "1:269118493133:web:20aeb425c3004b9766b484"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDNXVi3tfutV6ZGI6-rt3xmfKxoxEBCnBo",
  authDomain: "ideotic-login.firebaseapp.com",
  projectId: "ideotic-login",
  storageBucket: "ideotic-login.appspot.com",
  messagingSenderId: "474345075482",
  appId: "1:474345075482:web:dd8958b4d62d01a0a672a3"
};

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
