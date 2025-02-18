import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Signup } from './pages/signup.tsx';
import { Signin } from './pages/signin.tsx';
import { Friend } from './pages/friends.tsx';
import { AddFriend } from './pages/add_friends.tsx';
import { Message } from './pages/message.tsx';
import LandingPage from './pages/landing.tsx';
import { SecureMessage } from './pages/SecureMessage.tsx';
import { UserDetail } from './pages/user_detail.tsx';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  
  useEffect(() => {
    const token = localStorage.getItem("JWT");
    setIsAuthenticated(!!token);
  }, []);

  //  const  handleLogin = () => {
  //   const token = localStorage.getItem("JWT");
  //   setIsAuthenticated(!!token); // Update auth state after login
  // };

  return (
    <BrowserRouter>
      <Routes>
       <Route
          path="/"
          element={isAuthenticated ? <Navigate to={"/friends"}/> : <LandingPage />}
        />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />

        {/* Protected Routes */}
        <Route
          path="/friends"
          element={isAuthenticated ? <Friend selectedFriend='?' /> : <LandingPage />}
        />
        <Route
          path="/add/friends"
          element={isAuthenticated ? <AddFriend /> : <LandingPage />}
        />
        <Route
          path="/message/:username"
          element={isAuthenticated ? <Message /> : <LandingPage />}
        />
<Route path="/message/private/:username" element={isAuthenticated? <SecureMessage/>:<LandingPage/>}/>
        {/* Landing Page Route */}
      
        <Route path="/profile/:username" element={isAuthenticated?<UserDetail/>:<LandingPage/>} />
        <Route path="/landing" element={<LandingPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
