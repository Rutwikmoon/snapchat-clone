import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from "./Preview";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Chats from  "./Chats";
import ChatView from "./ChatView";
import { selectuser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { auth } from "./firebase";
import {useEffect} from "react";
import { login, logout } from "./features/appSlice";

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  })
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img
          className = "app_logo"
          src = "https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
          alt = "" 
          />
          <div className = "app_body">
          <div className = "app_bodyBackground">
          <Switch>
          <Route path = "/chats/view">
              <ChatView />
            </Route>
          <Route path = "/chats">
              <Chats />
            </Route>
            <Route path = "/preview">
              <Preview />
            </Route>
            <Route exact path = "/">
              <WebcamCapture />
            </Route>
          </Switch>
          </div>
          
        </div>
        </>
        )} 
        
      </Router>
      
    </div>
  );
}

export default App;
