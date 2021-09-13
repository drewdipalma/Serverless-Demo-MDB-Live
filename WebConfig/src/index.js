import React from 'react'
import { render } from 'react-dom'
import { Stitch } from "mongodb-stitch-browser-sdk";
import App from './App'

const APP_ID = "serverless-party-pnwuh";

// Instantiate a StitchClient
export const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

render(
  <App />,
  document.getElementById("root"),
);