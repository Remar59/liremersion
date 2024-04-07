// MainApp.js
import React, { createContext} from "react";
import App from "./App";
import AudioPlayer from "./components/AudioPlayer";

export const AudioContext = createContext();

export default function MainApp() {

  return (
    <AudioContext.Provider>
      <App  />
      <AudioPlayer />
    </AudioContext.Provider>
  );
}
