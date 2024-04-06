import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import SignIn from "./pages/SignIn";
import PostForm from "./components/PostForm";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import { AuthProvider } from './context/AuthProvider';
import PublicLayout from "./components/PublicLayout";
import Friends from "./pages/Friends";


const App = () => {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Layout />} >

              <Route element={<RequireAuth />}>
                <Route path="/" element={<Main />} />
                <Route path="createPost" element={<PostForm />} />
                <Route path="friends" element={<Friends />} />
              </Route>

            </Route>

            <Route path="/" element={<PublicLayout />}>
              <Route path="login" element={<SignIn />} />

              {/*  <Route path="register" element={<Register />} /> */}

            </Route>

          </Routes>
        </AuthProvider>
      </Router>
    </div>

  );
};


export default App;
