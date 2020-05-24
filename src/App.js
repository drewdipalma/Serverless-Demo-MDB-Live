import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {app} from "./index";
import style from './Style.js'
import TopNav from './Components/TopNav.js'
import ContentButtons from './Components/ContentButtons.js'
import { AnonymousCredential} from "mongodb-stitch-browser-sdk";

export default function App(props) {

  // State for Log-in, based on Anonymous vs non-Anonymous authentication
  const [loggedIn, setLoggedIn] = React.useState(initialAuthState());

  async function initialAuthState(){
    try{
      app.auth.user ? await app.auth.refreshAccessToken() : await app.auth.loginWithCredential(new AnonymousCredential());
    } catch(error) {
      console.log("Issue authenticating user:", error)
    }
  
    setLoggedIn(app.auth.user.loggedInProviderType === "anon-user" ? false : true);
  }

  return (
    <div style={style.container}>
      <TopNav  loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <ContentButtons />
    </div>
  );
}