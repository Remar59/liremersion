import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import users from "../src/reducers/users";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AudioPlayer from "./components/AudioPlayer";


const reducers = combineReducers({ users });
const persistConfig = { key: "root", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App() {

const [selectedTrack,setSelectedTrack] = useState(null);


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <AudioPlayer selectedTrack={selectedTrack}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories setSelectedTrack={setSelectedTrack}/>} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
} 

export default App;
